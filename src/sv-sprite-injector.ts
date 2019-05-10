// This will automatically inject the SVG symbol defs
// to be use via <use>


function injectSprites(document: HTMLDocument) {
  const CREATE_ELEMENT = 'createElement';
  const A_ELEMENT = document[CREATE_ELEMENT]('a');
  const DIV_ELEMENT = document[CREATE_ELEMENT]('div');

  function load(path: string, callback, errorCallback) {
    if (path) {
      const req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (req.readyState == 4 &&
          req.status == 200) {
            callback(req.responseText);
          }
      }
      req.onerror = errorCallback;
      req.open('GET', path, true);
      req.send();
    }
  }

  function buildSvgSprite(svgSpriteStr: string, absUrl: string) {
    DIV_ELEMENT.innerHTML = svgSpriteStr;
    const svg = DIV_ELEMENT.removeChild(DIV_ELEMENT.firstChild).cloneNode(true);
    svg['style'] = 'display:none';
    svg['data-inject-url'] = absUrl;
    return svg;
  }

  function getAbsoluteUrl(url): string {
    A_ELEMENT.href = url;
    return A_ELEMENT.href;
  }

  function applyAllOptions(optionKey, optionsArr, func) {
    for (let i = 0; i < optionsArr.length; ++i) {
      const options = optionsArr[i];
      if (options.hasOwnProperty(optionKey)){
        func(options[optionKey]);
      }
    }
  }

  // const spriteHandlerMap = {};
  const cachedMap = {};

  function SVGSpriteInject(path: string, options) {
    options = options || {};
    const absUrl = getAbsoluteUrl(path);
    let cached = cachedMap[absUrl];

    if (cached) {
      const svgSprite = cached.svgSprite;
      if (svgSprite) {
        if (options.onInjected) {
          options.onInjected(svgSprite);
        }
      } else {
        cached.optionsArr.push(options);
      }
    } else {
      let removed = false;

      cachedMap[absUrl] = cached = {
        spriteHandler: {
          remove: function() {
            if (!removed) {
              let cachedSvgSprite = cached.svgSprite;
              if (cachedSvgSprite) {
                const parentNode = cachedSvgSprite.parentNode;
                parentNode && parentNode.removeChild(cachedSvgSprite);
                cached.svgSprite = null;
              }
              delete cachedMap[absUrl];
              removed = true;
            }
          }
        },
        svgSprite: null,
        optionsArr: [options]
      };

      load(path, function(svgSpriteStr) {
        let svgSprite = buildSvgSprite(svgSpriteStr, absUrl);
        if (!removed) {
          cached.svgSprite = svgSprite;
          document.documentElement.appendChild(svgSprite);
          applyAllOptions('afterInject', cached.optionsArr, function (afterInject) {
            afterInject(svgSprite);
          });
        }
      }, function(e) {
        applyAllOptions('onLoadFail', cached.optionsArr, function(onLoadFail) {
          onLoadFail(e);
        });
      });
    }
    return cached.spriteHandler;
  };

  return SVGSpriteInject;
}

const SVGSpriteInject = injectSprites(document);

export const spriteInject = (path: string, options = {}) => {
  SVGSpriteInject(path, options);
}

var main = (function (exports) {
  'use strict';

  const CREATE_ELEMENT = "createElement";
  const DIV = document[CREATE_ELEMENT]('div');
  let SVGSprites;
  const debugHandler = (ctx) => {
      if (ctx instanceof Error)
          console.error(ctx);
      console.log(ctx);
  };
  const fetchSprites = (path, callback, errorCallback) => {
      return fetch(path)
          .then((response) => {
          return response.text()
              .then((svg) => {
              return callback(svg.trim());
          })
              .catch((err) => {
              errorCallback(err);
          });
      });
  };
  const buildSVGSprites = (svgStr, absUrl) => {
      DIV.innerHTML = svgStr;
      let svg = DIV.removeChild(DIV.firstChild);
      svg["style"] = "display:none";
      svg["data-inject-url"] = absUrl;
      // console.log(svg);
      return svg;
  };
  const getAbsUrl = (path) => {
      let a = document[CREATE_ELEMENT]('a');
      a.href = path;
      return a.href;
  };
  const injectSprites = async (path) => {
      let absUrl = await getAbsUrl(path);
      await fetchSprites(path, function (svg) {
          SVGSprites = buildSVGSprites(svg, absUrl);
          // console.log('Sprites =>', SVGSprites);
          return document.documentElement.appendChild(SVGSprites);
      }, (err) => {
          debugHandler(err);
      });
  };

  exports.injectSprites = injectSprites;

  return exports;

}({}));

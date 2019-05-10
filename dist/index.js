var sprites = (function (exports) {
  'use strict';

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
<<<<<<< HEAD
      DIV.innerHTML = svgStr;
      let svg = DIV.removeChild(DIV.firstChild);
      svg["style"] = "display:none";
      svg["data-inject-url"] = absUrl;
      // console.log(svg);
=======
      let div = document.createElement('div');
      div.innerHTML = svgStr;
      let svg = div.removeChild(div.firstChild);
      svg["style"] = "display:none";
      svg["data-inject-url"] = absUrl;
>>>>>>> latest
      return svg;
  };
  const getAbsUrl = (path) => {
      let a = document.createElement('a');
      a.href = path;
      return a.href;
  };
  const inject = async (path) => {
      let absUrl = await getAbsUrl(path);
      await fetchSprites(path, function (svg) {
<<<<<<< HEAD
          SVGSprites = buildSVGSprites(svg, absUrl);
          // console.log('Sprites =>', SVGSprites);
=======
          let SVGSprites = buildSVGSprites(svg, absUrl);
>>>>>>> latest
          return document.documentElement.appendChild(SVGSprites);
      }, (err) => {
          debugHandler(err);
      });
  };

  exports.inject = inject;

  return exports;

}({}));

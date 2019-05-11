var sprites = (function (exports) {
  'use strict';

  const CACHE_NAME = "svg-sprites-v1";
  const errorHandler = (err) => {
      console.error(err);
      return Error(err.message);
  };
  const addToCache = (response, path) => {
      caches.open(CACHE_NAME).then((cache) => {
          cache.put(path, response);
      });
  };
  const fetchSvgSprites = (path) => {
      return window.fetch(path, { mode: "no-cors" }).then((response) => {
          addToCache(response.clone(), path);
          return response;
      }).catch((err) => errorHandler(err));
  };
  const getSvgFromCache = (path) => {
      return caches.match(CACHE_NAME).then((response) => {
          if ((response) === undefined) {
              return fetchSvgSprites(path).then(response => {
                  return response;
              });
          }
          else {
              return response;
          }
      });
  };
  const fetchSpritesCache = (path) => {
      return getSvgFromCache(path);
  };

  const debugHandler = (ctx) => {
      if (ctx instanceof Error)
          console.error(ctx);
      console.log(ctx);
  };
  const fetchSprites = (path, callback, errorCallback) => {
      return fetchSpritesCache(path)
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
      let div = document.createElement('div');
      div.innerHTML = svgStr;
      let svg = div.removeChild(div.firstChild);
      svg["style"] = "display:none";
      svg["data-inject-url"] = absUrl;
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
          let SVGSprites = buildSVGSprites(svg, absUrl);
          return document.documentElement.appendChild(SVGSprites);
      }, (err) => {
          debugHandler(err);
      });
  };

  exports.inject = inject;

  return exports;

}({}));

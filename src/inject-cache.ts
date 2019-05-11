const CACHE_NAME = "svg-sprites-v1";

const errorHandler = (err: Error) => {
  console.error(err);
  return Error(err.message);
}

const addToCache = (response: Response, path: string) => {
  caches.open(CACHE_NAME).then((cache) => {
    cache.put(path, response);
  })
}

const fetchSvgSprites = (path: string) => {
  return window.fetch(path, {mode: "no-cors"}).then((response) => {
      addToCache(response.clone(), path);
      return response;
    }).catch((err) => errorHandler(err));
}

const getSvgFromCache = (path: string) => {
  return caches.match(CACHE_NAME).then((response) => {
      if ((response) === undefined) {
          return fetchSvgSprites(path).then(response => {
            return response;
          })
        } else {
          return response;
      }
    });
}



export const fetchSpritesCache = (path: string) => {
  return getSvgFromCache(path)
}

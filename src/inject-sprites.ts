const CREATE_ELEMENT = "createElement";
const DIV = document[CREATE_ELEMENT]('div');
let SVGSprites;

const debugHandler = (ctx) => {
  if (ctx instanceof Error) console.error(ctx);
  console.log(ctx);
}

const fetchSprites = (path: string, callback: (svg: string) => void, errorCallback: (err: Error) => void ) => {
  return fetch(path)
    .then((response) => {
      return response.text()
        .then((svg) => {
          callback(svg) })
    .catch((err) => {
      errorCallback(err) })})}

const buildSVGSprites = (absUrl: string) => {
  let svg = DIV.removeChild(DIV.firstChild);
  svg["style"] = "display:none";
  svg["data-inject-url"] = absUrl;
  return svg.cloneNode(true);
}

const getAbsUrl = (path: string) => {
  let a = document[CREATE_ELEMENT]('a');
  a.href = path;
  return a.href;
}

export const injectSprites = (path: string) => {
  let absUrl = getAbsUrl(path);

  SVGSprites = fetchSprites(path, (svg) => {
    DIV.innerHTML = svg;
    return buildSVGSprites(absUrl);
  }, (err) => {
    debugHandler(err);
  });

  document.documentElement.appendChild(SVGSprites)
}

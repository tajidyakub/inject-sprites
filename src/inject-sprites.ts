const CREATE_ELEMENT = "createElement";
const DIV = document[CREATE_ELEMENT]('div');
let SVGSprites: Node;

const debugHandler = (ctx) => {
  if (ctx instanceof Error) console.error(ctx);
  console.log(ctx);
}

const fetchSprites = (path: string, callback: (svg: string) => void, errorCallback: (err: Error) => void ) => {
  return fetch(path)
    .then((response) => {
      return response.text()
        .then((svg) => {
          return callback(svg.trim()) })
    .catch((err) => {
      errorCallback(err) })})}

const buildSVGSprites = (svgStr: string, absUrl: string): Node => {
  DIV.innerHTML = svgStr;
  let svg = DIV.removeChild(DIV.firstChild);
  svg["style"] = "display:none";
  svg["data-inject-url"] = absUrl;
  // console.log(svg);
  return svg;
}

const getAbsUrl = (path: string) => {
  let a = document[CREATE_ELEMENT]('a');
  a.href = path;
  return a.href;
}

export const injectSprites = async (path: string) => {
  let absUrl = await getAbsUrl(path);
  await fetchSprites(path, function (svg) {
    SVGSprites = buildSVGSprites(svg, absUrl);
    // console.log('Sprites =>', SVGSprites);
    return document.documentElement.appendChild(SVGSprites);
  }, (err) => {
    debugHandler(err);
  });
}

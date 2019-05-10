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
  let div = document.createElement('div');
  div.innerHTML = svgStr;
  let svg = div.removeChild(div.firstChild);
  svg["style"] = "display:none";
  svg["data-inject-url"] = absUrl;
  return svg;
}

const getAbsUrl = (path: string) => {
  let a = document.createElement('a');
  a.href = path;
  return a.href;
}

export const inject = async (path: string) => {
  let absUrl = await getAbsUrl(path);
  await fetchSprites(path, function (svg) {
    let SVGSprites: Node = buildSVGSprites(svg, absUrl);
    return document.documentElement.appendChild(SVGSprites);
  }, (err: Error) => {
    debugHandler(err);
  });
}

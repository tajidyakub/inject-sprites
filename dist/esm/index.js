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
            callback(svg);
        })
            .catch((err) => {
            errorCallback(err);
        });
    });
};
const buildSVGSprites = (absUrl) => {
    let svg = DIV.removeChild(DIV.firstChild);
    svg["style"] = "display:none";
    svg["data-inject-url"] = absUrl;
    return svg.cloneNode(true);
};
const getAbsUrl = (path) => {
    let a = document[CREATE_ELEMENT]('a');
    a.href = path;
    return a.href;
};
const injectSprites = (path) => {
    let absUrl = getAbsUrl(path);
    SVGSprites = fetchSprites(path, (svg) => {
        DIV.innerHTML = svg;
        return buildSVGSprites(absUrl);
    }, (err) => {
        debugHandler(err);
    });
    document.documentElement.appendChild(SVGSprites);
};

export { injectSprites };

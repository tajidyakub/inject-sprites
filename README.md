# Inject SVG Sprites

> Inject SVG Sprites into HTML Page.

## Usage

Attach the script inside `<head>` and inject the sprites into the page with executing injectSprites function.

``` html
<head>
  <script src="https://cdn.jsdelivr.net/gh/tajidyakub/svg-sprites-inject@latest/dist/index.js"></script>
  <script>
    sprites.inject('https://cdn.jsdelivr.net/gh/tajidyakub/svg-icon-component@latest/dist/collection/assets/sprites/sprites.svg');
  </script>
</head>
```

## Accepted Params

The function accept an `url` path as parameter, define the path to your SVG Sprites file to be injected in to the HTML page.

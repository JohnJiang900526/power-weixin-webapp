// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      name: 'duplicate-style',
      options: {
        cssProcessorOptions: {
          safe: true,
          autoprefixer: {
            add: true,
            "browsers": [
              "iOS >= 7",
              "Android >= 4.1"
            ]
          }
        }
      }
    }
  }
}

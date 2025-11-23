self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/[...params]": [
    "static/chunks/pages/[...params].js"
  ],
  "/_error": [
    "static/chunks/pages/_error.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error",
    "/[...params]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()
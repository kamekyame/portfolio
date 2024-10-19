module.exports = {
  extends: ["stylelint-config-recess-order", "stylelint-config-standard-scss"],
  rules: {
    "selector-pseudo-element-colon-notation": "double",
    "at-rule-no-unknown": null,
    "scss/selector-no-union-class-name": true,
    "scss/at-rule-no-unknown": true,
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["export"] }],
    "property-no-unknown": [true, { ignoreSelectors: [":export"] }],
    "media-query-no-invalid": null
  },
  ignoreFiles: ["**/node_modules/**"],
};
module.exports = {
    "parser": "babel-eslint",
    "rules": {
        "indent": [
            2,
            "tab"
        ],
        "quotes": [
            2,
            "double"
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "semi": [
            2,
            "always"
        ],
        "babel/generator-star-spacing": 1,
        "babel/new-cap": 1,
        "babel/object-curly-spacing": 1,
        "babel/object-shorthand": 1,
        "babel/arrow-parens": 1,
        "babel/no-await-in-loop": 1
    },
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "extends": "eslint:recommended",
    "ecmaFeatures": {
        "jsx": true,
        "experimentalObjectRestSpread": true
    },
    "plugins": [
        "react",
        "babel"
    ]
};

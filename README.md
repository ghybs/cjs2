# cjs2: Recursive CommonJS Loader Plugin for RequireJS

Load CommonJS modules without needing to convert them to AMD.
Any dependency will also be loaded through cjs2,
unless specified otherwise in the [require configuration](#use-global-require-for-sub-dependencies).

Adapted from the  [CommonJS Loader Plugin for RequireJS (cjs)](https://github.com/guybedford/cjs).

AMD and CommonJS are actually incredibly similar formats so this plugin is very short.

[![GitHub releases](https://img.shields.io/github/release/ghybs/cjs2.svg?label=GitHub)](https://github.com/ghybs/cjs2/releases)
[![npm](https://img.shields.io/npm/v/cjs2.svg)](https://www.npmjs.com/package/cjs2)


## Usage

To load a CommonJS module in RequireJS simply do:

```javascript
require(['cjs2!my-commonjs-module'], function(mymodule) {
  // Do something
});
```

### How it works

If your module looks like:

```javascript
var someDep = require('a-dependency');
exports.out = 'asdf';
```

…then it is dynamically converted into:

```javascript
define(function(require, exports, module) {
(function() {
  var define = undefined; // ensures any amd detection is disabled
  var someDep = require('cjs2!a-dependency');
  exports.out = 'asdf';
})();
});
```

…which is the AMD module format.

Dependencies are naturally handled by referring back to the plugin.

Supports:
* Cross-origin dynamic loading
* Builds
* Precompilation with the `optimizeAllPluginResources` r.js build option
* Amazingness

Built with the [AMD-Loader plugin helper](https://github.com/guybedford/amd-loader).


### Use global require for sub-dependencies

In some cases, we replace some sub-dependencies by modules that are not in CommonJS format.
In such situations, we can have cjs2 plugin use the global `require` instead of recursively using `cjs2` to load those modules.
Use the `require.config.cjs2config.globalRequire` array to list those modules:
```javascript
require.config({
  cjs2config: {
    globalRequire: [
        'path', // List of modules (sub-dependencies) that should be loaded through global require instead of cjs2
        'unfetch'
    ]
  }
});
```


## Install

```shell
volo add ghybs/cjs2
```

If not using package management, ensure that the [AMD-Loader](https://github.com/guybedford/amd-loader) plugin is installed.


## License

[![license](https://img.shields.io/github/license/ghybs/cjs2.svg)](LICENSE)

The cjs2 loader plugin is distributed under the [MIT License](http://choosealicense.com/licenses/mit/) (Expat type),
like the  [CommonJS Loader Plugin for RequireJS (cjs)](https://github.com/guybedford/cjs).

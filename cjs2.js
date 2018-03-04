// Adapted from CommonJS Loader Plugin for RequireJS
// https://github.com/guybedford/cjs
// This version loads sub-dependencies using cjs2 plugin as well (assuming all dependencies are in CommonJS, which would be consistent).
// However, in some cases, we find replacements that are not in CommonJS format.
// In that case, use the require.config.cjs2config.globalRequire array to specify those modules that should not be loaded through cjs2 but using the normal global require.

define(['amd-loader'], function(amdLoader) {
  var cjsRequireRegExp = /\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;

  return amdLoader('cjs2', 'js', function(name, source, req, callback, errback, config) {
    var globalRequire = getPluginGlobalRequire(config);

    // Replace sub-dependencies require's using this plugin, except if they are listed in require.config.cjs2config.globalRequire.
    source = source.replace(cjsRequireRegExp, function (match, dep) {
      return ' require("' + (globalRequire.includes(dep) ? '' : 'cjs2!') + dep + '")';
    });
    // wrap up in common js wrapper
    callback('define(function(require, exports, module) { (function(){var define=undefined;' + source + ' \n//# sourceURL=' + req.toUrl(name) + '\n})() });');
  });

  function getPluginGlobalRequire(config) {
    return getPluginConfig(config).globalRequire || [];
  }

  function getPluginConfig(config) {
    return config.cjs2config || {};
  }
});

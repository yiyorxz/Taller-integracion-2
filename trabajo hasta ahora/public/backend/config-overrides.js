// config-overrides.js
module.exports = function override(config, env) {
    // Agregar el polyfill para el módulo path
    config.resolve.fallback = {
        path: require.resolve('path-browserify'),
        // Agrega otros polyfills aquí si es necesario
    };
    return config;
};

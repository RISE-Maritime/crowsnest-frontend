/* eslint-disable */
module.exports = function override(config) {
    config.module.rules.push({
        resolve:{
            alias: {
                ...config.resolve.alias,
                'mapbox-gl': 'maplibre-gl'
            }
        }
    })

    return config
}


/* eslint-enable */
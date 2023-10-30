/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')('./i18n.ts');

const nextConfig = {
    reactStrictMode : false,
    images : {
        domains : ["images.adsttc.com", "devapi.oqot.uz", "api.oqot.uz"]
    },
    //revalidate : 60,
    styleResources : {
        css : [
            "./tailwind.config.ts"
        ]
    },
    webpack(config , { isServer } ) {
        // Configures webpack to handle SVG files with SVGR. SVGR optimizes and transforms SVG files
        // into React components. See https://react-svgr.com/docs/next/

        // Grab the existing rule that handles SVG imports
        // @ts-ignore - rules is a private property that is not typed
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
}

module.exports = withNextIntl(nextConfig)

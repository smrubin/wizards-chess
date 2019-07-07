module.exports = () => {

    return {
        /**
         * Entry points to the app and puzzle demo
         */
        entry: {
            app: './src/index.js',
            puzzle: './puzzle/index.js'
        },

        /**
         * Split outputs between main app and puzzle demo
         */
        output: {
            filename: "[name].js"
        },

        /**
         * Compile for usage in a browser-like environment
         */
        target: 'web',

        resolve: {
            /**
             * Automatically resolve certain extensions
             */
            extensions: ['.js'],
        }
    };
};

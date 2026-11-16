import webp from 'webpack';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url));

export default webp.defineConfig({
    entry: path.join(__dirname, 'src/main.ts'),
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: 'main.bundled.js',
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.join(__dirname, 'tsconfig.webpack.json'),
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: false,
    },
});

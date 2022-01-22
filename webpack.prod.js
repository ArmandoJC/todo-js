// Webpack se ejecuta en node.
// Se requiere ese paquete en la aplicación.
const HtmlWebPackPlugin         = require("html-webpack-plugin");
const MiniCssExtractPlugin      = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin   = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin              = require("babel-minify-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  output: {
    // filename: 'main.[contentHash].js',
    // filename: "main.[hash].js",
    filename: "main.[contenthash].js",
    // path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        },
        // Al parecer en babel se tiene un error con la sintaxis del use
        // use: [
        //   {
        //     loader: "babel-loader",
        //     options: {
        //       presets: ["@babel/preset-env"],
        //     },
        //   },
        // ],
      },
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // Le decimos a webpack que aplique esta regla si es un archivo con extensión html
        test: /\.html$/,
        use: [
          {
            // Como loader su usará el paquete que importamos
            loader: "html-loader",
            options: { minimize: false },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       // Para que no me de ciertos problemas a la hora de importar los módulos
        //       // esModule: false,
        //       // name: 'assets/[name].[ext]',
        //       name: '[name].[ext]',
        //       outputPath: "assets",
        //     },
        //   },
        // ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      // Le dice a webpack qué archivo es el que quiero tomar.
      template: "./src/index.html",
      // Le dice a webpack hacia dónde quiero colocarlo
      filename: "./index.html",
      //Esta es toda la configuración
    }),
    new MiniCssExtractPlugin({
      // filename: "[name].[hash].css",
      filename: "[name].[contenthash].css",
      // Para que no nos sirvan los warnings
      ignoreOrder: false,
    }),
    // new MinifyPlugin(minifyOpts, pluginOpts), No son necesarios las opciones.
    new MinifyPlugin(),
  ],
};

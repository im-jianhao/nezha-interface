//开启JS多线程的压缩
const TerserPlugin = require('terser-webpack-plugin');
const os = require('os');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:5].bundule.js',
    assetModuleFilename: 'images/[name].[contenthash:5][ext]',
  },
  performance: {
    maxAssetSize: 250000, // 最大资源大小250KB
    maxEntrypointSize: 250000, // 最大入口资源大小250KB
    hints: 'warning', // 超出限制时只给出警告
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'nezha',
      filename: 'index.html',
      template: resolve(__dirname, '../src/index-prod.html'),
      favicon: './public/favicon.ico',
    }),
    // 配置 Workbox 的 GenerateSW 插件
    new GenerateSW({
      // 预缓存的文件匹配规则
      include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/], // 只缓存必要的文件类型
      exclude: [/\.map$/, /manifest.*\.js$/], // 排除 source maps 和 manifest 文件

      // 控制缓存文件大小，避免缓存过大文件
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 限制为 5MB

      // 运行时缓存策略
      runtimeCaching: [
        {
          // 缓存 API 请求
          urlPattern: /^https:\/\/api\.example\.com\/.*/,
          handler: 'StaleWhileRevalidate', // 缓存优先，同时后台更新
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50, // 最多缓存 50 个条目
              maxAgeSeconds: 24 * 60 * 60, // 缓存 24 小时
            },
          },
        },
        {
          // 缓存第三方 CDN 资源（如 jQuery）
          urlPattern: /^https:\/\/cdn\.example\.com\/.*/,
          handler: 'CacheFirst', // 缓存优先，适合不常变化的资源
          options: {
            cacheName: 'cdn-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 缓存 7 天
            },
          },
        },
      ],

      // Service Worker 立即接管页面
      clientsClaim: true,
      skipWaiting: true,

      // 缓存版本控制：避免缓存冲突
      cleanupOutdatedCaches: true,

      // 可选：自定义 Service Worker 输出路径
      swDest: 'service-worker.js',
    }),
  ],
};

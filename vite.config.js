import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons"


export default ({command,mode}) => {
  const env=loadEnv(mode, process.cwd());
  return defineConfig({
    base: command === 'dev' ? './' : env.VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: false,
        entry: '/src/main.js',
        template: 'public/index.html',
        inject: {
          data: {
            title: '后台管理系统',
            injectScript: `<script src="/config.js"></script>`,
          },
        },
      }),
      viteMockServe({
        mockPath:'./mock',
        supportTs: false,
        localEnabled: command === 'serve'||'dev',
        logger:true
      }),
      createSvgIconsPlugin({
        iconDirs:[path.resolve(process.cwd(),'src/icons')],
        symbolId:'icon-[dir]-[name]'
      })
    ],

    resolve:{
      alias:[
        { find: "@", replacement: path.resolve(__dirname, 'src')},
        { find: "@core", replacement: path.resolve(__dirname, 'core')},
        { find: "@views", replacement: path.resolve(__dirname, 'src/views')},
        { find: "@theme", replacement: path.resolve(__dirname, 'src/theme')},
        { find: "@store", replacement: path.resolve(__dirname, 'core/store')},
        { find: "@router", replacement: path.resolve(__dirname, 'core/router')},
        { find: "@utils", replacement: path.resolve(__dirname, 'core/utils')},
        { find: "@comps", replacement: path.resolve(__dirname, 'src/components')},
        { find: "@apis", replacement: path.resolve(__dirname, 'src/apis')},
      ],
      extensions: ['.vue', '.js', '.json','.mjs']
    },
    server:{
      open:true,
      host:'0.0.0.0',
      port:80,
      https:false,
      proxy:{
        '/api':{
          target:'http://127.0.0.1',
          changeOrigin:true,
          rewrite:path => path.replace(/^\/api/, '')
        }
        // '/socket.io': {
        //   target: 'http://127.0.0.1',
        //   ws: true,
        //   changeOrigin: true
        // }
      },
      define: {
        'process.env': {}
      }
    },
    /* 打包配置 */
    build: {
      sourcemap: command==='dev',
      brotliSize: false,
      emptyOutDir: false,
      outDir: "dist",
      assetsDir: "static"
    }
  })
}

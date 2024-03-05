import { defineConfig } from 'vite';
import { resolve } from 'path'

import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite' //引入api自动导入插件


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({ 
      imports: ['vue', 'vue-router'],
      // 在src目录下生成一个指令文件存放各种全局指令
      dts: 'src/auto-import.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 路径别名
    },
    extensions: ['.js', '.json', '.ts', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    open: true, // 运行是否自动打开浏览器
  },
})

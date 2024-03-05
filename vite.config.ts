import { defineConfig } from 'vite';
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from "unplugin-auto-import/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      eslintrc: {
        enabled: false,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    })
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

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl' //本地端Run自動產https憑證
// import { version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), basicSsl()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') //設定import @是從src開始
    }
  },
  define: {
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false, // 設為 true 可開啟更多 hydration debug 資訊
    __APP_VERSION__: JSON.stringify(require("./package.json").version),
  }
})

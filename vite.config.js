import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig({
 /* server:{
    proxy:{
      '/api': 'http://localhost:5173/'
    }
  },*/
  plugins: [react()],
  base:'/PNews/',
 /* define:{
    'process.env.VITE_API_KEY':JSON.stringify(process.env.VITE_API_KEY)
  }*/
})

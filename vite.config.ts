import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { prospectorPlugin } from './server/prospectorPlugin.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    envPrefix: ['VITE_', 'PIAPI_'],
    define: {
      'import.meta.env.PIAPI_API_KEY': JSON.stringify(env.PIAPI_API_KEY || env.VITE_PIAPI_API_KEY || ''),
      'import.meta.env.PIAPI_MODEL': JSON.stringify(env.PIAPI_MODEL || env.VITE_PIAPI_MODEL || ''),
    },
    plugins: [react(), prospectorPlugin(env)],
  }
})

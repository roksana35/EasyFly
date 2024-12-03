// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// dotenv কনফিগারেশন লোড করুন
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env, // process.env ব্যবহারযোগ্য করুন
  },
});


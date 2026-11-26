import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    host: true,
    open: false,
  },

  build: {
    // Raise the warning threshold slightly — Three.js is unavoidably large
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        /**
         * manualChunks splits vendor code into stable, cacheable files.
         *
         * Strategy:
         *  vendor-react      → react + react-dom (small, rarely changes)
         *  vendor-gsap       → gsap + lenis (animation utilities, main.js uses these)
         *  vendor-three-core → three.js only (core math + renderers)
         *  vendor-r3f        → @react-three/fiber + drei (R3F runtime, desktop only)
         *  vendor-r3f-fx     → @react-three/postprocessing + postprocessing (bloom etc.)
         *
         * Scene.jsx is already loaded via React.lazy → dynamic import() so it
         * lands in its own async chunk and is never fetched on mobile.
         */
        manualChunks(id) {
          // ── Three.js core ──────────────────────────────────────────────────
          if (id.includes('node_modules/three/')) {
            return 'vendor-three-core';
          }

          // ── R3F postprocessing (Bloom, EffectComposer) — heaviest sub-dep ─
          if (
            id.includes('node_modules/postprocessing/') ||
            id.includes('node_modules/@react-three/postprocessing/')
          ) {
            return 'vendor-r3f-fx';
          }

          // ── R3F runtime (@react-three/fiber + drei) ───────────────────────
          if (
            id.includes('node_modules/@react-three/fiber/') ||
            id.includes('node_modules/@react-three/drei/')
          ) {
            return 'vendor-r3f';
          }

          // ── GSAP + Lenis ──────────────────────────────────────────────────
          if (
            id.includes('node_modules/gsap/') ||
            id.includes('node_modules/lenis/')
          ) {
            return 'vendor-gsap';
          }

          // ── React runtime ─────────────────────────────────────────────────
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor-react';
          }
        },
      },
    },
  },

  // Pre-bundle these so Vite's dev server resolves them without full CJS→ESM transforms
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'lenis'],
    // three + R3F are ESM-native and already optimised by Vite automatically
  },
});

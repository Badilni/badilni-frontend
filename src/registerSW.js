import { registerSW } from 'virtual:pwa-register'

/**
 * Registers the Vite PWA service worker.
 *
 * - autoUpdate mode: silently updates the SW in the background.
 * - onNeedRefresh: called when a new SW is waiting. If you want a "New
 *   version available — click to update" toast, call updateSW() here.
 * - onOfflineReady: called when the app is fully cached and usable offline.
 *
 * Import this file once at the top of src/main.jsx:
 *   import './registerSW'
 */
const updateSW = registerSW({
  onNeedRefresh() {
    // A new service worker is waiting to activate.
    // With registerType: 'autoUpdate' this fires silently.
    // Uncomment below to show a manual update prompt instead:
    // if (confirm('New version available. Reload to update?')) updateSW(true)
    updateSW(true)
  },
  onOfflineReady() {
    console.info('[PWA] App is ready to work offline.')
  },
  onRegistered(registration) {
    console.info('[PWA] Service worker registered:', registration)
  },
  onRegisterError(error) {
    console.error('[PWA] Service worker registration failed:', error)
  },
})
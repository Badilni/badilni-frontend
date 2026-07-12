import { useState, useEffect } from 'react'

export function usePWAInstall() {
  // Seed from the prompt captured early in index.html (fires before React mounts)
  const [promptEvent, setPromptEvent] = useState(
    () => window.__pwaInstallPrompt ?? null
  )
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // In case the prompt arrives after React has mounted (e.g. dev hot-reload)
    const handleBeforeInstall = (e) => {
      e.preventDefault()
      window.__pwaInstallPrompt = e
      setPromptEvent(e)
    }

    // Fired by the inline script in index.html when the prompt is captured early
    const handlePromptReady = () => {
      if (window.__pwaInstallPrompt) {
        setPromptEvent(window.__pwaInstallPrompt)
      }
    }

    const handleAppInstalled = () => {
      window.__pwaInstallPrompt = null
      setPromptEvent(null)
      setIsInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('pwa-prompt-ready', handlePromptReady)
    window.addEventListener('appinstalled', handleAppInstalled)

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('pwa-prompt-ready', handlePromptReady)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const install = async () => {
    if (!promptEvent) return
    promptEvent.prompt()
    const { outcome } = await promptEvent.userChoice
    if (outcome === 'accepted') setIsInstalled(true)
    setPromptEvent(null)
  }

  return {
    canInstall: Boolean(promptEvent) && !isInstalled,
    isInstalled,
    install,
  }
}
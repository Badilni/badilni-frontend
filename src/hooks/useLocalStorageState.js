/**
 * src/hooks/useLocalStorageState.js
 *
 * ── Audit result: NO logic changes needed. ──────────────────────────────────
 *
 * The hook itself is correct. The risk was purely in what was stored in it.
 *
 * ✅  KEEP using this hook for UI preferences:
 *      useLocalStorageState('ui:theme', 'light')
 *      useLocalStorageState('ui:language', 'en')
 *      useLocalStorageState('ui:sidebarOpen', true)
 *      useLocalStorageState('ui:tablePageSize', 20)
 *
 * ❌  NEVER use for auth data:
 *      'token', 'accessToken', 'refreshToken', 'user', 'session'
 *      — those belong in HttpOnly cookies (tokens) or Zustand (user object).
 *
 * localStorage is readable by any JS on the page, including injected scripts.
 * HttpOnly cookies are completely invisible to JS by design.
 * ───────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'

export default function useLocalStorageState(key, initialValue) {
  const readValue = () => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (err) {
      console.warn('useLocalStorageState: reading localStorage failed', err)
      return initialValue
    }
  }

  const [state, setState] = useState(readValue)

  useEffect(() => {
    try {
      const valueToStore = state === undefined ? null : state
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      console.warn('useLocalStorageState: writing localStorage failed', err)
    }
  }, [key, state])

  const remove = () => {
    try {
      window.localStorage.removeItem(key)
      setState(undefined)
    } catch (err) {
      console.warn('useLocalStorageState: removing localStorage failed', err)
    }
  }

  return [state, setState, remove]
}

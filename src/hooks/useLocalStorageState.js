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

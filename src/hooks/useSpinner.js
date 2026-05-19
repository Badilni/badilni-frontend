import { useState, useEffect } from 'react'

export const useSpinner = (fullText, delay = 800, typingSpeed = 150) => {
  const [text, setText] = useState('')
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setShowText(true)
    }, delay)

    let typingTimeout

    if (showText && text.length < fullText.length) {
      typingTimeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, typingSpeed)
    } else {
      typingTimeout = setTimeout(() => {
        setText('')
      }, 1000)
    }

    return () => {
      clearTimeout(initialTimeout)
      if (typingTimeout) clearTimeout(typingTimeout)
    }
  }, [text, showText, fullText, delay, typingSpeed])

  return { text, showText }
}

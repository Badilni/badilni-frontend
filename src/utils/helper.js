import { Slide, toast } from 'react-toastify'

const baseOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  transition: Slide,
}

export const onInvalid = (errors) => {
  // `errors` may come from Zod's `formErrors.fieldErrors` which maps
  // field names to arrays of message strings, or from other sources.
  Object.values(errors).forEach((err) => {
    if (!err) return

    // Zod fieldErrors: array of strings
    if (Array.isArray(err)) {
      err.forEach((msg) => {
        if (msg) handleToastMessage(msg, 'warning')
      })
      return
    }

    // Single string error
    if (typeof err === 'string') {
      handleToastMessage(err, 'warning')
      return
    }

    // Fallback for objects with a `message` property
    if (err?.message) {
      handleToastMessage(err.message, 'warning')
    }
  })
}

export const handleToastMessage = (message, type) => {
  const theme = document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light'
  const options = { ...baseOptions, theme }

  switch (type) {
    case 'success':
      toast.success(message, options)
      break
    case 'warning':
      toast.warning(message, options)
      break
    case 'error':
      toast.error(message, options)
      break
    default:
      toast(message, options)
  }
}

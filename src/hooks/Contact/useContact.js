import { useState } from 'react'

export default function useContactUs() {
  const [isPostPopupOpen, setIsPostPopupOpen] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'Technical Support',
    message: '',
  })

  const handleOpenPopup = () => {
    setIsPostPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPostPopupOpen(false)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('Form Submitted:', formData)
    //Call API
  }

  return {
    isPostPopupOpen,
    formData,
    handleOpenPopup,
    handleClosePopup,
    handleInputChange,
    handleFormSubmit,
  }
}

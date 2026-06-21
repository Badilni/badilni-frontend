import { useState, useRef } from 'react'

export default function useCreatePost(onClose) {
  const [selectedCategory, setSelectedCategory] = useState('Knowledge Share')
  const [skills, setSkills] = useState(['Product Design', 'System Design'])
  const [skillInput, setSkillInput] = useState('')
  const [postText, setPostText] = useState('')

  const [attachedImage, setAttachedImage] = useState(null)
  const [attachedFile, setAttachedFile] = useState(null)

  const fileInputRef = useRef(null)
  const imageInputRef = useRef(null)

  const categories = ['Knowledge Share', 'Collaboration', 'Question', 'Event']

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault()
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()])
      }
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const triggerImageUpload = () => imageInputRef.current?.click()
  const triggerFileUpload = () => fileInputRef.current?.click()

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      console.log(`this type of file is chosen ${type}:`, file.name)
      if (type === 'image') setAttachedImage(file)
      if (type === 'file') setAttachedFile(file)
    }
  }

  const handlePostSubmit = () => {
    console.log('Sending all data to API:', {
      postText,
      selectedCategory,
      skills,
      attachedImage,
      attachedFile,
    })

    if (onClose) onClose()
  }

  return {
    selectedCategory,
    setSelectedCategory,
    skills,
    skillInput,
    setSkillInput,
    postText,
    setPostText,
    categories,
    handleAddSkill,
    handleRemoveSkill,
    handlePostSubmit,
    fileInputRef,
    imageInputRef,
    triggerImageUpload,
    triggerFileUpload,
    handleFileChange,
    attachedImage,
    attachedFile,
  }
}

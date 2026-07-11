import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryKeyword = searchParams.get('keyword') || ''

  const querySmartSearch = searchParams.get('smartSearch') || false

  const [keywordInput, setKeywordInput] = useState(queryKeyword)

  const [smartSearch, setSmartSearch] = useState(querySmartSearch)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (keywordInput.trim()) {
      setSearchParams({ keyword: keywordInput.trim(), page: 1, type: 'all' })
    } else {
      setSearchParams({})
    }
  }

  const handleClearSearch = () => {
    setKeywordInput('')
    setSearchParams({})
  }

  return {
    keywordInput,
    setKeywordInput,
    queryKeyword,
    handleSearchSubmit,
    handleClearSearch,
  }
}

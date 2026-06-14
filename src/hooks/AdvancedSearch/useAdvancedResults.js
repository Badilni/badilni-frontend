import { useState } from 'react';

export default function useAdvancedResults() {
  const [openFilter, setOpenFilter] = useState({
    speakersLists: true,
    topicsTypes: false,
    budget: true,
    date: false,
  });

  const [activeSaveMenu, setActiveSaveMenu] = useState(null);

  const toggleFilter = (key) => {
    setOpenFilter(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return {
    openFilter,
    activeSaveMenu,
    setActiveSaveMenu,
    toggleFilter
  };
}

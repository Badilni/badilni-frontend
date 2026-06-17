import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

export default function FloatingActionButton({ onClick }) {
  const [bottomPosition, setBottomPosition] = useState(32);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer') || document.getElementById('footer');
      if (!footer) return;

      const totalDocHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      const footerHeight = footer.getBoundingClientRect().height;
      const distanceToBottom = totalDocHeight - scrollPosition;

      if (distanceToBottom < footerHeight) {

        const newBottom = footerHeight - distanceToBottom + 32;
        setBottomPosition(newBottom);
      } else {
        setBottomPosition(32);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        bottom: `${bottomPosition}px`,
      }}
      className="fixed right-8 z-40 flex items-center justify-center w-14 h-14 bg-[#3b82f6] text-white rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-110 focus:outline-none"
      aria-label="Add item"
    >
      <FaPlus size={18} />
    </button>
  );
}

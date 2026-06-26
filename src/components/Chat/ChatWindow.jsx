import { useState, useRef, useEffect } from 'react';
import { FiChevronLeft, FiSend, FiChevronRight, FiSmile } from 'react-icons/fi';
import EmojiPicker from 'emoji-picker-react';

const ChatWindow = ({
  viewMode, setViewMode, currentChat, messageText, setMessageText,
  onSendMessage, messagesEndRef, isInfoOpen, setIsInfoOpen
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef(null);

  // Close emoji picker when clicking outside the component container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Append selected emoji to current text message input field string
  const handleEmojiClick = (emojiData) => {
    setMessageText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className={`flex-1 h-full bg-[var(--background-light)] flex flex-col p-4 md:p-6 transition-all duration-300 ${
      viewMode === 'chat' ? 'flex' : viewMode === 'sidebar' ? 'hidden md:flex' : 'hidden lg:flex'
    }`}>

      {/* Active Conversation Header Section */}
      <div className="flex justify-between items-center pb-4 border-b border-[var(--gray-text)]/10 dark:border-[var(--border-color)] shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setViewMode("sidebar")}
            className="p-2 -ml-2 mr-1 bg-[var(--whiteBackground)] rounded-xl text-[var(--gray-text)] hover:text-[var(--black-text)] md:hidden transition-colors shrink-0"
          >
            <FiChevronLeft size={18} />
          </button>

          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-bold text-[var(--black-text)] truncate">{currentChat.name}</h3>
            <p className="text-xs text-[var(--success)] font-medium mt-0.5">Active now</p>
          </div>
        </div>

        {/* Info Side Panel Control Toggle Button */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className="p-2.5 bg-[var(--whiteBackground)] border border-[var(--gray-text)]/10 rounded-xl text-[var(--gray-text)] hover:text-[var(--black-text)] transition-all flex items-center justify-center shadow-sm"
            title={isInfoOpen ? "Hide Details" : "Show Details"}
          >
            {isInfoOpen ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
          </button>
        </div>
      </div>

      {/* Messages Thread Timeline Scroll Container */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {currentChat.messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end w-full' : 'items-start max-w-[85%] md:max-w-[70%]'}`}>
            <span className="text-[10px] text-[var(--gray-text)] mb-0.5 px-2">{msg.time}</span>
            <div className="flex items-end gap-2">
              {!msg.isMe && <img src={msg.avatar || currentChat.img} className="w-7 h-7 rounded-full object-cover mb-1 shrink-0" alt="" />}
              <div className={`p-3 text-xs md:text-sm rounded-2xl ${
                msg.isMe
                  ? 'bg-[var(--primary-light)] text-white rounded-br-none'
                  : 'bg-[var(--whiteBackground)] text-[var(--black-text)] rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Text Input and Delivery Actions Form */}
      <form
        onSubmit={onSendMessage}
        className="bg-[var(--whiteBackground)] rounded-2xl p-2 shadow-sm flex items-center gap-2 shrink-0 border border-slate-200/80 dark:border-[var(--border-color)] relative"
      >

        {/* Emoji Selector Anchor Interface Trigger */}
        <div ref={pickerRef} className="relative flex items-center">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-[var(--gray-text)] hover:text-[var(--primary-light)] transition-colors"
          >
            <FiSmile size={20} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-16 left-0 z-50 shadow-2xl rounded-2xl overflow-hidden max-w-[320px] sm:max-w-[380px]">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                autoFocusSearch={false}
                theme="light"
                height={360}
                width={340}
              />
            </div>
          )}
        </div>

        {/* Main Composition Text Box Field */}
        <input
          type="text"
          placeholder="Write your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-1 bg-transparent px-2 text-xs md:text-sm text-[var(--black-text)] focus:outline-none"
        />

        {/* Submit Output Button Element */}
        <button type="submit" className="p-2.5 bg-[var(--primary-light)] text-white rounded-xl hover:opacity-90 transition-opacity">
          <FiSend size={14} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;

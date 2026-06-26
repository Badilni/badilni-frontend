import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { FiX, FiMaximize2 } from 'react-icons/fi';
import ChatWindow from './ChatWindow';

// Mock Data
const mockChatsList = [
  {
    id: "chat_1",
    userId: "user_kate",
    name: "Kate Johnson",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    lastMessage: "He creates an atmosphere of mystery ✨",
    time: "11:26 AM",
    messages: [
      { id: 1, text: "Recently I saw properties in a great location that I did not pay attention to before 🤔", time: "11:24 AM", isMe: false },
      { id: 2, text: "He creates an atmosphere of mystery ✨", time: "11:26 AM", isMe: true }
    ],
    filesCount: 12, linksCount: 2, fileBreakdown: []
  },
  {
    id: "chat_2",
    userId: "user_tamara",
    name: "Tamara Shevchenko",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    lastMessage: "typing...",
    time: "10:05 AM",
    messages: [
      { id: 1, text: "Are you going to a business meeting tomorrow?", time: "10:05 AM", isMe: false }
    ],
    filesCount: 5, linksCount: 1, fileBreakdown: []
  }
];

const HeaderChatDropdown = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState(mockChatsList);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");

  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0 });

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Handle dropdown positioning coordinates
  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownCoords({
        top: rect.bottom + window.scrollY + 10,
        left: rect.right + window.scrollX - 340
      });
    }
  }, [isDropdownOpen]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Handle switching from dropdown selection to popup chat window
  const handleSelectChat = (chat) => {
    if (!chat) return;
    setSelectedChat(chat);
    setIsDropdownOpen(false);
    setIsPopupOpen(true);
  };

  // Handle chat message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setSelectedChat(prev => (prev ? { ...prev, messages: [...prev.messages, newMessage] } : null));
    setChats(prevChats => prevChats.map(c => c.id === selectedChat.id ? { ...c, messages: [...c.messages, newMessage] } : c));
    setMessageText("");
  };

  // Handle full screen navigation redirection
  const handleMaximize = () => {
    if (!selectedChat || !selectedChat.userId) return;
    setIsPopupOpen(false);
    navigate('/chat', { state: { selectUserId: selectedChat.userId } });
  };

  return (
    <div className="inline-block">

      {/* Navbar Trigger Button Element */}
      <button
        ref={buttonRef}
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
          setIsPopupOpen(false);
        }}
        className={`p-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
          isDropdownOpen || isPopupOpen
            ? 'bg-gray-200 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
        aria-label="Open chat application wrapper"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Part 1: Recent Chats Dropdown Panel */}
      {isDropdownOpen && createPortal(
        <div
          ref={dropdownRef}
          style={{ top: dropdownCoords.top, left: dropdownCoords.left }}
          className="fixed w-[340px] bg-white dark:bg-slate-900 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] overflow-hidden border-0 z-[999999] animate-fade-in"
        >
          <div className="p-4 font-extrabold text-xs uppercase tracking-wider text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-800/80">
            Recent Chats
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-800/60">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                className="p-4 flex items-center gap-4 hover:bg-blue-50/50 dark:hover:bg-slate-800/80 cursor-pointer transition-all duration-150"
              >
                <div className="relative shrink-0">
                  <img src={chat?.img} className="w-12 h-12 rounded-full object-cover shadow-sm" alt="" />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm animate-pulse"></span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h5 className="font-bold text-sm text-gray-900 dark:text-white truncate">{chat?.name}</h5>
                    <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 shrink-0">{chat?.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-300 truncate font-normal">{chat?.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}

      {/* Part 2: Floating Active Chat Popup Window */}
      {isPopupOpen && selectedChat && createPortal(
        <div className="fixed bottom-0 right-12 w-[400px] h-[550px] bg-white dark:bg-slate-900 rounded-t-2xl shadow-[0_-15px_50px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_-15px_50px_-10px_rgba(0,0,0,0.7)] border-0 flex flex-col overflow-hidden z-[99999] transition-all duration-300">

          {/* Popup Window Header Area */}
          <div className="bg-[var(--primary-light)] dark:bg-slate-800 text-white p-4 flex justify-between items-center shrink-0 shadow-md">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img src={selectedChat?.img} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20" alt="" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[var(--primary-light)] dark:border-slate-800"></span>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-sm truncate leading-tight text-white">{selectedChat?.name}</h4>
                <span className="text-xs text-white/70 font-medium">Active now</span>
              </div>
            </div>

            {/* Popup Window Header Control Actions */}
            <div className="flex items-center gap-1.5">
              <button onClick={handleMaximize} className="p-2 hover:bg-white/15 dark:hover:bg-white/10 text-white rounded-lg transition-colors" title="Open in full screen">
                <FiMaximize2 size={15} />
              </button>
              <button onClick={() => setIsPopupOpen(false)} className="p-2 hover:bg-white/15 dark:hover:bg-white/10 text-white rounded-lg transition-colors">
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Popup Window Messages Container Section */}
          <div className="flex-1 h-full overflow-hidden flex flex-col bg-gray-50 dark:bg-slate-950">
            <ChatWindow
              viewMode="chat"
              setViewMode={() => {}}
              currentChat={selectedChat}
              messageText={messageText}
              setMessageText={setMessageText}
              onSendMessage={handleSendMessage}
              messagesEndRef={messagesEndRef}
              isInfoOpen={false}
              setIsInfoOpen={() => {}}
            />
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default HeaderChatDropdown;

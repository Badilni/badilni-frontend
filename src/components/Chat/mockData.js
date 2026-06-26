import { FiFileText, FiImage, FiVideo, FiFolder } from 'react-icons/fi';

export const initialChats = [
  {
    id: "chat_1",
    name: "Real estate deals",
    img: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=100",
    membersCount: 10,
    typing: true,
    filesCount: 231,
    linksCount: 45,
    messages: [
      { id: 1, sender: "Kate Johnson", time: "11:24 AM", text: "Recently I saw properties in a great location that I did not pay attention to before 😊", isMe: false, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
      { id: 2, sender: "Evan Scott", time: "11:25 AM", text: "Ooo, why don't you say something more", isMe: false, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
      { id: 3, sender: "You", time: "11:26 AM", text: "He creates an atmosphere of mystery 😉", isMe: true }
    ],
    fileBreakdown: [
      { name: "Documents", count: "126 files", size: "193MB", color: "text-[var(--primary-light)]", icon: FiFileText },
      { name: "Photos", count: "53 files", size: "321MB", color: "text-[var(--success)]", icon: FiImage },
      { name: "Movies", count: "3 files", size: "210MB", color: "text-[var(--danger)]", icon: FiVideo },
      { name: "Other", count: "49 files", size: "194MB", color: "text-[var(--gray-text)]", icon: FiFolder }
    ]
  },
  {
    id: "chat_2",
    name: "Kate Johnson",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    membersCount: 2,
    typing: false,
    filesCount: 12,
    linksCount: 2,
    messages: [
      { id: 1, sender: "Kate Johnson", time: "09:10 AM", text: "Hi! Did you review the skill list request?", isMe: false, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
      { id: 2, sender: "You", time: "09:15 AM", text: "Yes, I am working on the escrow transaction logic right now.", isMe: true }
    ],
    fileBreakdown: [
      { name: "Documents", count: "10 files", size: "15MB", color: "text-[var(--primary-light)]", icon: FiFileText },
      { name: "Photos", count: "2 files", size: "4MB", color: "text-[var(--success)]", icon: FiImage }
    ]
  }
];

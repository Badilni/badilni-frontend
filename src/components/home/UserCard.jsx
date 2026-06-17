// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const UserCard = React.memo(({ user }) => {
//   const navigate = useNavigate()

//   // Safe extraction of nested profile parameters
//   const userId = user?._id || user?.id
//   const avatarUrl = user?.avatar?.url || user?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'
//   const name = user?.name || 'Community Member'
//   const rating = Number(user?.averageRating || user?.rating || 0).toFixed(1)
//   const skillsCount = Array.isArray(user?.skills) ? user.skills.length : (user?.skillsCount || 0)
//   const bio = user?.bio || user?.about || 'No description provided yet.'
//   const location = user?.location || 'Remote'

//   const handleProfileNavigation = () => {
//     if (userId) navigate(`/profile/${userId}`)
//   }

//   return (
//     <article className="flex flex-col h-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">

//       {/* Top Meta: Avatar & Location info */}
//       <div className="flex items-start gap-4 mb-4">
//         <img
//           src={avatarUrl}
//           alt={`${name}'s profile avatar`}
//           loading="lazy"
//           className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/20 dark:border-blue-400/20 shrink-0"
//         />
//         <div className="min-w-0 flex-1">
//           <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
//             {name}
//           </h3>
//           <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400 mt-0.5">
//             <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0zi" />
//             </svg>
//             <span className="truncate">{location}</span>
//           </p>
//         </div>
//       </div>

//       {/* Metrics Row: Rating pill and Skills counter */}
//       <div className="flex items-center gap-3 mb-3.5 text-xs font-semibold">
//         <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
//           <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//           </svg>
//           <span>{rating}</span>
//         </div>
//         <div className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
//           {skillsCount} {skillsCount === 1 ? 'Skill' : 'Skills'}
//         </div>
//       </div>

//       {/* Bio text block - flex fill expands card evenly */}
//       <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3 flex-1">
//         {bio}
//       </p>

//       {/* View Profile Action node */}
//       <button
//         onClick={handleProfileNavigation}
//         className="w-full py-2.5 text-xs font-bold rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer"
//       >
//         View Profile
//       </button>
//     </article>
//   )
// })

// UserCard.displayName = 'UserCard'
// export default UserCard

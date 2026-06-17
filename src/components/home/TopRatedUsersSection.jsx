// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import UserCard from './UserCard'
// import UserCardSkeleton from './UserCardSkeleton'

// export default function TopRatedUsersSection() {
//   const navigate = useNavigate()
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(false)

//   useEffect(() => {
//     const fetchTopRatedUsers = async () => {
//       try {
//         setLoading(true)
//         setError(false)

//         // Adjust endpoint path matching your project's server configuration
//         const response = await api.get()
//         if (!response.ok) throw new Error('API Execution Error')

//         const data = await response.json()
//         const userList = Array.isArray(data) ? data : (data.users || [])

//         // Filter and sort by average rating descending, limit results to top 10
//         const sortedTopTen = userList
//           .sort((a, b) => Number(b.averageRating || 0) - Number(a.averageRating || 0))
//           .slice(0, 10)

//         setUsers(sortedTopTen)
//       } catch (err) {
//         console.error('Error handling Top Rated Users request:', err)
//         setError(true)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTopRatedUsers()
//   }, [])

//   return (
//     <section className="w-full py-16 bg-slate-50 dark:bg-slate-950/40 transition-colors duration-200">
//       <div className="max-w-7xl mx-auto px-4 md:px-8">

//         {/* Section Header Text Blocks */}
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
//           <div>
//             <h2 className="text-2xl md:text-3xl font-black font-sans text-slate-800 dark:text-slate-100 tracking-tight">
//               Top Rated Members
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-slate-400 mt-1.5 font-medium">
//               Discover the highest-rated members of the Badilni community.
//             </p>
//           </div>

//           {!loading && !error && users.length > 0 && (
//             <button
//               onClick={() => navigate('/users')}
//               className="group flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors shrink-0 focus:outline-none cursor-pointer"
//             >
//               <span>View All Members</span>
//               <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Dynamic State Layout Rendering Elements */}
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {Array.from({ length: 4 }).map((_, idx) => (
//               <UserCardSkeleton key={idx} />
//             ))}
//           </div>
//         ) : error ? (
//           <div className="w-full flex flex-col items-center justify-center py-10 bg-white dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center">
//             <p className="text-sm font-medium text-red-500 dark:text-red-400">
//               Failed to load community members. Please check your network connection or try again later.
//             </p>
//           </div>
//         ) : users.length === 0 ? (
//           <div className="w-full flex flex-col items-center justify-center py-12 bg-white dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-6 text-center">
//             <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">
//               No top-rated profiles found at this moment.
//             </p>
//           </div>
//         ) : (
//           /* Structured Layout Grid Module (1 Mobile / 2 Tablet / 4 Desktop) */
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {users.map((user) => (
//               <UserCard key={user?._id || user?.id} user={user} />
//             ))}
//           </div>
//         )}

//       </div>
//     </section>
//   )
// }

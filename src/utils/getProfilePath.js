export function getProfilePath(targetUser, currentUser) {
  const targetId = targetUser?._id ?? targetUser?.id
  if (!targetId) return null
  const currentId = currentUser?._id ?? currentUser?.id
  return targetId === currentId ? '/profile' : `/profile/${targetId}`
}
const getHost = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return hostname
    }
  }
  return 'localhost'
}

const host = getHost()

export const serverBaseUrl = `http://${host}:3000/api/v1`
export const socketBaseUrl = `http://${host}:3000`

// https://badilni-backend-production.up.railway.app/api/v1
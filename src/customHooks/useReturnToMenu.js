import { useEffect } from 'react'

export const useReturnToMenu = () => {
  useEffect(() => {
    const goback = setTimeout(() => {
      window.location.href = '/'
    }, 3000)
    return () => clearTimeout(goback)
  }, [])
}

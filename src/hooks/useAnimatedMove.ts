import { useState, useCallback } from 'react'

export function useAnimatedMove() {
  const [isAnimating, setIsAnimating] = useState(false)
  
  const animateMove = useCallback((callback: () => void, duration: number = 200) => {
    if (isAnimating) return
    
    setIsAnimating(true)
    callback()
    
    setTimeout(() => {
      setIsAnimating(false)
    }, duration)
  }, [isAnimating])
  
  return { animateMove, isAnimating }
}
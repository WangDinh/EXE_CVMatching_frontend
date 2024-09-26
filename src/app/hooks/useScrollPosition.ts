import { useEffect, useState } from 'react'

const useScrollPosition = () => {
  const [isTop, setIsTop] = useState(true)
  const [isBottom, setIsBottom] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      setIsTop(scrollPosition === 0)
      setIsBottom(Math.ceil(scrollPosition + windowHeight) >= docHeight)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { isTop, isBottom }
}

export default useScrollPosition

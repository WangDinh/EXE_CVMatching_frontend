import { useState } from 'react'

// use element id to scroll
const useScrollTo = () => {
  const [isScrolling, setIsScrolling] = useState(false)

  const handleScrollTo = (value: string) => {
    setIsScrolling(true)

    const element = document.getElementById(value)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })

      setTimeout(() => {
        setIsScrolling(false)
      }, 500)
    }
  }

  return { isScrolling, handleScrollTo }
}

export default useScrollTo

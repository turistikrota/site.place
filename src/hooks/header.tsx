import { useListener } from '@turistikrota/ui/hooks/dom'
import { useState } from 'react'

export const useHeaderFixed = () => {
  const [fixed, setFixed] = useState(false)

  useListener('scroll', () => {
    const checkPoint = fixed ? 64 : 120
    setFixed(window.scrollY >= checkPoint)
  })

  return fixed
}

export const useSizeWithoutHeader = () => {
  return 'calc(100vh - 63px)'
}

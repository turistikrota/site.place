'use client'

import { useState } from 'react'
import { useListener } from '@turistikrota/ui/hooks/dom'

export const useHeaderFixed = () => {
  const [fixed, setFixed] = useState(false)

  useListener('scroll', () => {
    let checkPoint = fixed ? 64 : 120
    setFixed(window.scrollY >= checkPoint)
  })

  return fixed
}

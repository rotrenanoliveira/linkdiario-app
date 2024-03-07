'use client'

import { useEffect, useState } from 'react'

export const LabelCompanyName = ({ companyName }: { companyName: string }) => {
  const [name, setName] = useState<string>(companyName)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (typeof window !== 'undefined' && name.length > 12 && isMobile) {
      setName(name.substring(0, 12).concat('...'))
    }
  }, [name])

  return <>{name}</>
}

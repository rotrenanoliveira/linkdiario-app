'use client'

import { useEffect, useState } from 'react'
import { MoveUpRight } from 'lucide-react'
import Sketch from '@uiw/react-color-sketch'

import { satochi } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface InputCampaignAccentColorProps {
  ctaText: string
  ctaColor: string
}

export function InputAccentColor({ ctaText, ctaColor }: InputCampaignAccentColorProps) {
  const [hex, setHex] = useState(ctaColor)
  const [invertColor, setInvertColor] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  function invertColorHandler() {
    setInvertColor(!invertColor)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => invertColorHandler(), [hex])

  const getContrastColor = (hexColor: string) => {
    const threshold = 128 // Adjust this threshold as needed
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b

    return luminance > threshold ? '#000000' : '#ffffff'
  }

  const invertStyle = {
    filter: invertColor ? 'invert(1)' : 'none',
    color: invertColor ? 'white' : getContrastColor(hex),
  }

  const btnBackgroundColor = {
    backgroundColor: isHovered ? `${hex}BF` : hex,
  }

  return (
    <div className="w-full inline-flex items-center justify-between gap-2 md:w-auto md:justify-normal">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Selecionar cor</Button>
        </PopoverTrigger>

        <PopoverContent className="w-fit p-0">
          <div className="w-fit">
            <Sketch
              color={hex}
              disableAlpha={true}
              onChange={(color) => {
                setHex(color.hex)
              }}
            />
          </div>
        </PopoverContent>
      </Popover>

      <div
        className="w-48 h-10 md:w-72 md:h-16 rounded-full p-1 cursor-pointer"
        style={btnBackgroundColor}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className={cn(
            satochi.className,
            'w-full flex items-center justify-evenly text-base lg:text-2xl text-foreground',
          )}
        >
          <span className="flex-grow text-center ml-7 font-normal" style={invertStyle}>
            {ctaText}
          </span>

          <div
            className="size-8 md:size-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: hex }}
          >
            <MoveUpRight className="text-foreground/85" style={invertStyle} />
          </div>
        </span>
      </div>

      <Input
        type="text"
        id="campaign-call-to-action-color"
        name="campaign-call-to-action-color"
        value={hex}
        readOnly
        className="hidden"
        required
      />
    </div>
  )
}

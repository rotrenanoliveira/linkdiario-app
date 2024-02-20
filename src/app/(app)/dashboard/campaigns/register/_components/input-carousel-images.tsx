// CustomInput.tsx

import { FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Image as ImageIcon, Upload } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export function InputCarouselImages() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files

    if (!fileList) {
      return
    }

    if (fileList.length > 1) {
      setErrorMessage('O carousel pode ter no máximo 3 imagens.')

      return
    }

    const inputFile = fileList[0]

    const isFileAnImage = inputFile.type.startsWith('image/')

    if (!isFileAnImage) {
      setErrorMessage('O arquivo selecionado não é uma imagem.')

      return
    }

    setFileName(inputFile.name)

    const fileURL = URL.createObjectURL(inputFile)
    setImageUrl(fileURL)
  }

  return (
    <div className="space-y-2">
      <Label>Imagens</Label>
      <FormDescription>Carregue a imagem que deseja exibir na campanha.</FormDescription>

      <div className="flex gap-4">
        <div className="w-1/2 lg:w-1/3 space-y-2">
          <Label
            htmlFor="campaign-carousel-image"
            className="min-h-[10rem] cursor-pointer flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed bg-zinc-50"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 transition-all duration-150 hover:bg-zinc-200">
              <Upload size={24} />
            </div>
            <span className="text-sm font-light text-gray-400">Carregue a imagem.</span>
          </Label>

          {errorMessage && <FormDescription className="text-red-500">{errorMessage}</FormDescription>}

          <Input
            onChange={handleSelectImages}
            type="file"
            accept="image/*"
            hidden={true}
            id="campaign-carousel-image"
            name="campaign-carousel-image"
            className="invisible h-0 w-0"
          />
        </div>

        {fileName && (
          <div className="flex-1">
            <div className="min-h-[10rem] cursor-pointer flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed">
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-zinc-100 transition-all duration-150">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={fileName}
                    width={80}
                    height={80}
                    className="size-20 object-cover rounded-md"
                  />
                ) : (
                  <ImageIcon size={24} />
                )}
              </div>
              <span className="text-sm font-light text-gray-900">{fileName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

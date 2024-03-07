import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { Image as ImageIcon, Upload } from 'lucide-react'
import { toast } from 'sonner'

import { FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CarouselImage } from '@/core/types/campaign'

interface InputCarouselImagesProps {
  images: Array<CarouselImage>
}

export function InputCarouselImages({ images }: InputCarouselImagesProps) {
  // const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files

    if (!fileList) {
      return
    }

    if (fileList.length > 1) {
      toast.error('O carousel pode ter no mínimo 1 imagem.')

      return
    }

    const inputFile = fileList[0]

    const isFileAnImage = inputFile.type.startsWith('image/')

    if (!isFileAnImage) {
      toast.error('O arquivo selecionado não é uma imagem.')
      return
    }

    setFileName(inputFile.name)

    const fileURL = URL.createObjectURL(inputFile)
    setImageUrl(fileURL)
  }

  return (
    <div className="space-y-2">
      <Label>Imagens</Label>
      <FormDescription>Carregue a imagem que deseja exibir na campanha. O tamanho ideal é de 640x768.</FormDescription>

      <div className="flex gap-4">
        <div className="w-80 h-fit flex flex-col items-center justify-center gap-2 p-2 border-2 border-dashed bg-zinc-50 rounded-md">
          <Image
            src={images[0].url}
            alt={images[0].file}
            width={320}
            height={384}
            className="w-full h-full object-cover rounded-md"
          />
          <span className="text-sm font-light">{images[0].file.substring(0, 35).concat('...')}</span>
        </div>

        <div className="flex flex-col flex-1">
          <div className="space-y-2">
            <Label
              htmlFor="campaign-carousel-image"
              className="min-h-[10rem] cursor-pointer flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed bg-zinc-50"
            >
              <div className="flex size-20 items-center justify-center rounded-full bg-zinc-100 transition-all duration-150 hover:bg-zinc-200">
                <Upload size={24} />
              </div>
              <span className="text-sm font-light text-gray-400">Carregue a imagem.</span>
            </Label>

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
            <div className="flex-1  rounded-md border-2 border-dashed p-4">
              <div className="min-h-[10rem] max-h-full cursor-pointer flex flex-col items-center justify-center gap-2">
                <div className="flex size-40 items-center justify-center rounded-md bg-zinc-100 transition-all duration-150">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={fileName}
                      width={160}
                      height={160}
                      className="size-40 object-cover rounded-md"
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
    </div>
  )
}

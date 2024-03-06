import { ChangeEvent, useState } from 'react'
import { ImageIcon, Upload } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

import { FormDescription, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function InputCompanyLogo() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files

    if (!fileList) {
      return
    }

    if (fileList.length > 1) {
      toast.error('O logo pode ter no máximo 1 imagem.')

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
    <FormItem>
      <Label>Logo</Label>
      <FormDescription>
        Carregue a Logo da sua empresa (caso haja uma), tamanho ideal para a imagem: 96x384.
      </FormDescription>

      <div className="flex space-x-4">
        <div className="w-1/2 lg:w-1/3 space-y-2">
          <Label
            htmlFor="company-logo"
            className="min-h-[10rem] cursor-pointer flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed bg-zinc-50"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 transition-all duration-150 hover:bg-zinc-200">
              <Upload size={24} />
            </div>
            <span className="text-sm font-light text-gray-400">Carregue a imagem.</span>
          </Label>

          <Input
            onChange={handleSelectImages}
            type="file"
            accept="image/*"
            hidden={true}
            id="company-logo"
            name="company-logo"
            className="invisible h-0 w-0"
          />
        </div>

        {fileName && (
          <div className="flex-1">
            <div className="min-h-[10rem] cursor-pointer flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 transition-all duration-150">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={fileName}
                    width={80}
                    height={80}
                    className="size-20 object-cover rounded-full"
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
    </FormItem>
  )
}

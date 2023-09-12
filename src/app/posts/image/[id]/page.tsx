"use client"
import Breadcrumb from "@/components/Breadcrumb"
import BaseTemplate from "@/components/template/BaseTemplate"
import { useForm } from "react-hook-form"
import { PostService } from "../../service/PostService"
import { toast } from "react-toastify"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
type ImageProps = {
  image: FileList
}

const schema = z.object({
  image: z
    .instanceof(FileList)
    .refine((image) => image[0]?.size <= 100000, `Max file size is 1MB.`)
    .refine((image) => image[0]?.length == 0, { message: "Image is required." })
    .refine(
      (image) => {
        console.log(image)
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
        if (image) {
          return allowedTypes.includes(image[0]?.type)
        }
      },
      {
        message:
          "Imagem obrigatória. apenas arquivos JPEG, PNG e JPG são permitidos."
      }
    )
})

function Image({ params }: { params: { id: number } }) {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ImageProps>({
    resolver: zodResolver(schema)
  })

  async function onSubmit(data: ImageProps) {
    const formData = new FormData()

    formData.append("image", data.image[0])
    await PostService.updateImage(formData, params.id)
    toast.success("imagem enviada com sucesso")
  }

  return (
    <BaseTemplate>
      <Breadcrumb
        pageTitle="enviar imagem"
        title="listar"
        link="/posts"
        currentTitle="imagem"
      />
      <div className="wrapper-content">
        <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <label className="label block">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="file"
              className={`file-input file-input-bordered file-input-primary w-full`}
              {...register("image")}
            />
            <small className="text-red-500">{errors.image?.message}</small>
          </div>

          <div className="w-full text-center mt-3">
            <button className="btn btn-wide bg-violet-600 text-white hover:bg-violet-500">
              salvar
            </button>
          </div>
        </form>
      </div>
    </BaseTemplate>
  )
}

export default Image

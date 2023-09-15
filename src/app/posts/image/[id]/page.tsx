"use client"
import Breadcrumb from "@/components/Breadcrumb"
import BaseTemplate from "@/components/template/BaseTemplate"
import { useForm } from "react-hook-form"
import { PostService } from "../../service/PostService"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
type ImageProps = {
  image: FileList
}

function Image({ params }: { params: { id: number } }) {
  const [image, setImage] = useState("")

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ImageProps>()

  useEffect(() => {
    if (params.id) {
      findById(params.id)
      console.log(image)
    }
  }, [params.id])

  async function findById(id: number) {
    const response = await PostService.findById(id)
    setImage(response.image as string)
  }

  async function onSubmit(data: ImageProps) {
    const formData = new FormData()

    formData.append("image", data.image[0])
    const response = await PostService.updateImage(formData, params.id)
    toast.error(response?.message)
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

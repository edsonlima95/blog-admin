"use client"
import Breadcrumb from "@/components/Breadcrumb"
import BaseTemplate from "@/components/template/BaseTemplate"
import { useForm } from "react-hook-form"
import { PostService } from "../../service/PostService"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import Image from "next/image"
type ImageProps = {
  image: FileList
}

function PostImage({ params }: { params: { id: number } }) {
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ImageProps>()

  useEffect(() => {
    if (params.id) {
      findById(params.id)
    }
  }, [params.id])

  async function findById(id: number) {
    const response = await PostService.findById(id)
    if (response?.image) {
      setImage(response.image as string)
    }
  }

  async function onSubmit(data: ImageProps) {
    setLoading(true)
    const formData = new FormData()

    formData.append("image", data.image[0])
    const response = await PostService.updateImage(formData, params.id)

    if (response?.image) {
      setImage(response.image)
      setLoading(false)
      toast.success("Imagem enviada com sucesso!")
    } else {
      toast.error(response.message)
      setLoading(false)
    }
  }

  return (
    <BaseTemplate>
      <Breadcrumb
        pageTitle="enviar imagem"
        title="listar"
        link="/posts"
        currentTitle="imagem"
      />
      <div className="wrapper-content flex gap-3">
        {image && (
          <Image
            src={image}
            width={200}
            height={200}
            alt="Image do post"
            className="rounded-md"
          />
        )}

        <form
          className="py-2 flex items-center justify-center w-full gap-3"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full ">
            <input
              type="file"
              className={`file-input flex-1 file-input-bordered file-input-primary w-full bg-neutral-900`}
              {...register("image")}
            />
            <small className="text-red-500">{errors.image?.message}</small>
          </div>

          <div className="w-full">
            <button className="btn  btn-primary text-white">
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <span className="loading loading-spinner" />
                  <span> Enviando</span>
                </div>
              ) : (
                <span>Enviar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </BaseTemplate>
  )
}

export default PostImage

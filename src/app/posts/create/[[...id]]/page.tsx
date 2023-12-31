"use client"
import { Controller, useForm } from "react-hook-form"
import { PostService } from "../../service/PostService"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useState } from "react"
import { CategoryService } from "@/app/category/service/CategoryService"
import { CategoryProps } from "@/app/category/page"
import Breadcrumb from "@/components/Breadcrumb"
import BaseTemplate from "@/components/template/BaseTemplate"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { formats, modules } from "./reactquill.config"

type PostFormProps = {
  params: {
    id: [string | number]
  }
}

export type PostCreateProps = {
  id?: number
  title: string
  description: string
  status: boolean
  user_id: number
  category_id: string
}

const schema = z.object({
  title: z.string().nonempty({ message: "nome é obrigatório" }),
  description: z.string({
    required_error: "Descrição é obrigatório"
  }),
  status: z.string().nonempty({ message: "status é obrigatório" }),
  user_id: z.string(),
  category_id: z.string().nonempty({ message: "categoria é obrigatório" })
})

function PostForm({ params }: PostFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors }
  } = useForm<PostCreateProps>({ resolver: zodResolver(schema) })

  const [categories, setCategories] = useState<CategoryProps[]>()

  useEffect(() => {
    getCategories()
    if (params.id) {
      findById(Number(params.id[0]))
    }
  }, [])

  async function onSubmit(data: PostCreateProps) {
    console.log(data)
    if (params.id) {
      const response = await PostService.updatePost(Number(params.id[0]), data)
      if (response.message) {
        for (const error of response.message) {
          setError(error.property, { message: error.message })
        }
      } else {
        toast.success("Post atualizada com sucesso!")
      }
    } else {
      const response = await PostService.createPost(data)
      if (response?.message) {
        for (const error of response.message) {
          setError(error.property, { message: error.message })
        }
        toast.error(response.message)
      } else {
        toast.success("Post cadastrado com sucesso!")
      }
    }
  }

  async function findById(id: number) {
    const response = await PostService.findById(id)
    setValue("title", response.title)
    setValue("description", response.description)
    setValue("status", response.status)
    setValue("category_id", String(response.category.id))
  }

  async function getCategories() {
    const response = await CategoryService.getCategories()
    setCategories(response.categoriesList)
  }

  return (
    <BaseTemplate>
      <Breadcrumb
        pageTitle="cadastro de post"
        title="listar"
        link="/posts"
        currentTitle="post"
      />
      <div className="wrapper-content">
        <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" value={1} {...register("user_id")} />
          <div className="flex flex-wrap gap-3">
            {/* TITULO */}
            <div className="w-full">
              <label className="label block">
                <span className="label-text">Titulo</span>
              </label>
              <input
                type="text"
                placeholder="Digite o titulo"
                className={`input input-bordered w-full bg-neutral-900 ${
                  errors.title && "input-error"
                }`}
                {...register("title")}
              />
              <small className="text-red-500">{errors.title?.message}</small>
            </div>

            {/* DESCRIÇÃO */}
            <div className="w-full">
              <label className="label block">
                <span className="label-text">Descrição</span>
              </label>

              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ReactQuill
                    theme="snow"
                    formats={formats}
                    modules={modules}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <small className="text-red-500">
                {/*  {errors.description && "descrição é obrigatório"} */}
                {errors.description && <p>{errors.description.message} </p>}
              </small>
            </div>
          </div>

          {/* CATEGORIA */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="label">
                <span className="label-text">Categoria</span>
              </label>
              <select
                className={`select select-bordered w-full bg-neutral-900 ${
                  errors.category_id && "select-error"
                }`}
                {...register("category_id")}>
                <option value="">Escolha o status</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <small className="text-red-500">
                {errors.category_id?.message}
              </small>
            </div>

            {/* STATUS */}
            <div className="w-1/2">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className={`select select-bordered w-full bg-neutral-900 ${
                  errors.status && "select-error"
                }`}
                {...register("status")}>
                <option disabled>Escolha o status</option>
                <option value="ativo">ATIVO</option>
                <option value="inativo">INATIVO</option>
              </select>
              <small className="text-red-500">{errors.status?.message}</small>
            </div>
          </div>
          <div className="w-full text-center mt-3">
            <button className="btn btn-wide border-0 mt-2 bg-violet-600 text-white hover:bg-violet-500">
              salvar
            </button>
          </div>
        </form>
      </div>
    </BaseTemplate>
  )
}

export default PostForm

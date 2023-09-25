"use client"
import Breadcrumb from "@/components/Breadcrumb"
import BaseTemplate from "@/components/template/BaseTemplate"
import { useForm } from "react-hook-form"
import { CategoryService } from "../../service/CategoryService"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect } from "react"

type CategoryFormProps = {
  params: {
    id: [string | number]
  }
}

export type CategoryProps = {
  id?: number
  name: string
  description?: string
}

const schema = z.object({
  name: z.string().nonempty({ message: "nome é obrigatório" }),
  description: z.string().optional()
})

function CategoryForm({ params }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<CategoryProps>({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    if (params.id) {
      findById(Number(params.id[0]))
    }
  }, [])

  async function onSubmit(data: CategoryProps) {
    if (params.id) {
      const response = await CategoryService.updateCategory(
        Number(params.id[0]),
        data
      )
      if (response.message) {
        for (const error of response.message) {
          setError(error.property, { message: error.message })
        }
      } else {
        toast.success("Categoria atualizada com sucesso!")
      }
    } else {
      const response = await CategoryService.createCategory(data)
      if (response.message) {
        for (const error of response.message) {
          setError(error.property, { message: error.message })
        }
      } else {
        toast.success("Categoria cadastrada com sucesso!")
      }
    }
  }

  async function findById(id: number) {
    const response = await CategoryService.findById(id)
    setValue("name", response.name)
    setValue("description", response.description)
  }

  return (
    <BaseTemplate>
      <Breadcrumb
        pageTitle="cadastro de categorias"
        title="listar"
        link="/category"
        currentTitle="categoria"
      />
      <div className="wrapper-content">
        <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="label block">
                <span className="label-text">Nome</span>
              </label>
              <input
                type="text"
                placeholder="Digite o nome"
                className={`input input-bordered w-full bg-neutral-900 ${
                  errors.name && "input-error"
                }`}
                {...register("name")}
              />
              <small className="text-red-500">{errors.name?.message}</small>
            </div>
            <div className="w-1/2">
              <label className="label block">
                <span className="label-text">Descrição</span>
              </label>
              <input
                type="text"
                placeholder="Digite a descrição"
                className={`input input-bordered w-full bg-neutral-900 ${
                  errors.description && "input-error"
                }`}
                {...register("description")}
              />
              <small className="text-red-500">
                {errors.description?.message}
              </small>
            </div>
          </div>
          <div className="w-full text-center mt-3">
            <button className="btn btn-wide bg-violet-600 border-0 mt-2 text-white hover:bg-violet-500">
              salvar
            </button>
          </div>
        </form>
      </div>
    </BaseTemplate>
  )
}

export default CategoryForm

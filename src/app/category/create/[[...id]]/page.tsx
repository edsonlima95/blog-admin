"use client"
import Breadcrumb from "@/components/Breadcrumb"
import BaseTemplate from "@/components/template/BaseTemplate"
import { useForm } from "react-hook-form"
import { CategoryService } from "../../service/CategoryService"
import { toast } from "react-toastify"

/* type CategoryPramsProps = {
  params: {
    id: [string | number]
  }
}
 */

export type CategoryFormProps = {
  id?: number
  name: string
  description?: string
}

function CategoryForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<CategoryFormProps>()

  async function onSubmit(data: CategoryFormProps) {
    const response = await CategoryService.createCategory(data)
    if (response.message) {
      for (const error of response.message) {
        setError(error.property, { message: error.message })
      }
    } else {
      toast.success("Categoria cadastrada com sucesso!")
    }
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
                className={`input input-bordered w-full ${
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
                className={`input input-bordered w-full ${
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
            <button className="btn btn-wide bg-violet-600 text-white hover:bg-violet-500">
              salvar
            </button>
          </div>
        </form>
      </div>
    </BaseTemplate>
  )
}

export default CategoryForm

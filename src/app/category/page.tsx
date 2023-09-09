"use client"
import Breadcrumb from "@/components/Breadcrumb"
import BaseTemplate from "@/components/template/BaseTemplate"
import { FileEdit, Trash2 } from "lucide-react"
import { CategoryService } from "./service/CategoryService"
import { useEffect, useState } from "react"
import Link from "next/link"

export type CategoryProps = {
  id?: number
  name: string
  description?: string
}

function Category() {
  const [categories, setCategories] = useState<CategoryProps[]>()

  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories() {
    const response = await CategoryService.getCategory()
    setCategories(response)
  }

  return (
    <BaseTemplate>
      <Breadcrumb
        pageTitle="Lista de categorias"
        title="cadastrar"
        link="category/create"
        currentTitle="categorias"
      />
      <div className="wrapper-content">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category.id}>
                  <th>{category.id}</th>
                  <td>{category.name ? category.name : "-"}</td>
                  <td>{category.description ? category.description : "-"}</td>
                  <td className="flex gap-2">
                    {
                      <Link href={`/category/create/${category.id}`}>
                        <FileEdit
                          size={20}
                          className="cursor-pointer text-violet-400"
                        />
                      </Link>
                    }
                    {
                      <Trash2
                        size={20}
                        className="cursor-pointer text-red-600"
                      />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseTemplate>
  )
}

export default Category

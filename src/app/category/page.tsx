"use client"
import Breadcrumb from "@/components/Breadcrumb"
import BaseTemplate from "@/components/template/BaseTemplate"
import { FileEdit, Trash2 } from "lucide-react"
import { CategoryService } from "./service/CategoryService"
import { useEffect, useState } from "react"
import Link from "next/link"
import ConformModal from "@/components/ConfirmModal"
import swal from "sweetalert"
import { Pagination } from "@mui/material"

export type CategoryProps = {
  id?: number
  name: string
  description?: string
}

function Category() {
  const perpage = 5
  const [categories, setCategories] = useState<CategoryProps[]>()
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const totalPages = Math.ceil(totalItems / perpage)

  useEffect(() => {
    getCategories(page, perpage)
  }, [])

  async function getCategories(page: number, perpage: number) {
    const response = await CategoryService.getCategory(page, perpage)
    setCategories(response.categoriesList)
    setTotalItems(response.totalItems)
  }

  function handleChange(event, page: number) {
    setPage(page)
    getCategories(page, perpage)
  }

  async function confirmModal(id: number) {
    swal({
      title: "Deseja deletar esta categoria?",
      icon: "warning",
      buttons: {
        confirm: {
          value: id
        },
        cancel: "sair"
      },
      dangerMode: true
    }).then(async (id) => {
      if (id) {
        await CategoryService.deleteCategory(id)
        getCategories()
        swal("Categoria deletada com sucesso!", {
          icon: "success"
        })
      }
    })
  }

  return (
    <>
      <ConformModal
        title="Excluir categoria"
        modalId="modal_category"
        description="Texto do modal"
      />

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
                          onClick={() => confirmModal(Number(category.id))}
                        />
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 0 && perpage < totalItems ? (
              <div className="flex justify-center mt-2">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </BaseTemplate>
    </>
  )
}

export default Category

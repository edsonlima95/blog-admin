"use client"
import Breadcrumb from "@/components/Breadcrumb"
import ConfirmModal from "@/components/ConfirmModal"
import BaseTemplate from "@/components/template/BaseTemplate"
import { FileEdit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import swal from "sweetalert"
import { PostService } from "./service/PostService"
import { Pagination } from "@mui/material"

export type PostProps = {
  id?: number
  title: string
  description: string
  status: boolean
  user: {
    id: number
    name: string
  }
  category: {
    id: number
    name: string
  }
}

function PostList() {
  const perpage = 5
  const [posts, setPosts] = useState<PostProps[]>()
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const totalPages = Math.ceil(totalItems / perpage)

  useEffect(() => {
    getPosts(page, perpage)
  }, [])

  async function getPosts(page: number, perpage: number) {
    const response = await PostService.getPost(page, perpage)
    setPosts(response.postsList)
    setTotalItems(response.totalItems)
  }

  function handleChange(event, page: number) {
    setPage(page)
    getPosts(page, perpage)
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
        await PostService.deletePost(id)
        getPosts(page, perpage)
        swal("Categoria deletada com sucesso!", {
          icon: "success"
        })
      }
    })
  }

  return (
    <>
      <ConfirmModal
        title="Excluir categoria"
        modalId="modal_Post"
        description="Texto do modal"
      />

      <BaseTemplate>
        <Breadcrumb
          pageTitle="Lista de posts"
          title="cadastrar"
          link="posts/create"
          currentTitle="posts"
        />
        <div className="wrapper-content">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>title</th>
                  <th>Descrição</th>
                  <th>Situação</th>
                  <th>Autor</th>
                  <th>Categoria</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {posts?.map((post) => (
                  <tr key={post.id}>
                    <th>{post.id}</th>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{post.status ? "ativo" : "inativo"}</td>
                    <td>{post.user.name}</td>
                    <td>{post.category.name}</td>
                    <td className="flex gap-2">
                      {
                        <Link href={`/Post/create/${post.id}`}>
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
                          onClick={() => confirmModal(Number(post.id))}
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

export default PostList

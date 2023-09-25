import { TokenService } from "@/service/tokenService"
import { PostCreateProps } from "../create/[[...id]]/page"
import { PostProps, PostResponseProps } from "../page"

export class PostService {
  static async createPost(data: PostCreateProps) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
      },
      body: JSON.stringify(data)
    })
    if (response.status == 201) {
      return null
    }
    return response.json()
  }

  static async getPost(
    page: number,
    perpage: number
  ): Promise<PostResponseProps> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/posts?page=${page}&perpage=${perpage}`,
      {
        headers: {
          authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
        }
      }
    )

    return response.json()
  }

  static async findById(id: number): Promise<PostProps> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/posts/${id}`,
      {
        headers: {
          authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
        }
      }
    )

    return response.json()
  }

  static async updatePost(id: number, data: PostCreateProps) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/posts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
        },
        body: JSON.stringify(data)
      }
    )

    return response.json()
  }

  static async deletePost(id: number) {
    return await fetch(`${process.env.NEXT_PUBLIC_URL_API}/posts/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
      }
    })
  }

  static async updateImage(image: FormData, id: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/posts/image/${id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
        },
        body: image
      }
    )

    return response.json()
  }
}

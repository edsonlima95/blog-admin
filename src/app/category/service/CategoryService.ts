import { TokenService } from "@/service/tokenService"
import { CategoryProps, CategoryResponseProps } from "../page"

export class CategoryService {
  static async createCategory(data: CategoryProps) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
        },
        body: JSON.stringify(data)
      }
    )

    return response.json()
  }

  static async getCategoryByPagination(
    page: number,
    perpage: number
  ): Promise<CategoryResponseProps> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/categories?page=${page}&perpage=${perpage}`,
      {
        headers: {
          authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
        }
      }
    )

    return response.json()
  }

  static async getCategories(): Promise<CategoryResponseProps> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/categories/all`,
      {
        headers: {
          authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
        }
      }
    )

    return response.json()
  }

  static async findById(id: number): Promise<CategoryProps> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/categories/${id}`,
      {
        headers: {
          authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
        }
      }
    )

    return response.json()
  }

  static async updateCategory(id: number, data: CategoryProps) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/categories/${id}`,
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

  static async deleteCategory(id: number) {
    return await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categories/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
      }
    })
  }
}

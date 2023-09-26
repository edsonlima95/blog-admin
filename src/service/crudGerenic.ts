/* import { TokenService } from "./tokenService"

export class CrudService {
  static async create<T>(data: T) {
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
  static async getByPagination<T>(url: string): Promise<T> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/${url}`, {
      headers: {
        authorization: `Bearer ${TokenService.getTokenFromLocalStorage()}`
      }
    })

    return response.json()
  }

  static async getCategories(): Promise<CategoryResponseProps> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/categories/all`,
      {
        headers: {
          authorization: `Bearer ${CategoryService.getTokenFromLocalStorage()}`
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
          authorization: `Bearer ${CategoryService.getTokenFromLocalStorage()}`
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
          authorization: `Bearer ${CategoryService.getTokenFromLocalStorage()}`
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
        authorization: `Bearer ${CategoryService.getTokenFromLocalStorage()}`
      }
    })
  }
}
 */

import { CategoryProps } from "../page"

export class CategoryService {
  static async createCategory(data: CategoryProps) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )

    return response.json()
  }

  static async getCategory(
    page: number,
    perpage: number
  ): Promise<CategoryProps[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/categories?page=${page}&perpage=${perpage}`
    )

    return response.json()
  }

  static async findById(id: number): Promise<CategoryProps> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/categories/${id}`
    )

    return response.json()
  }

  static async updateCategory(id: number, data: CategoryProps) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/categories/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )

    return response.json()
  }

  static async deleteCategory(id: number) {
    return await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categories/${id}`, {
      method: "DELETE"
    })
  }
}

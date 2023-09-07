/* type CategoryProps = {
  name: string
  description?: string
} */

import Breadcrumb from "@/components/Breadcrumb"
import BaseTemplate from "@/components/template/BaseTemplate"

export default function Category() {
  /*   const response = await fetch(`${process.env.URL_API}/categories`, {
    next: {
      revalidate: 60
    }
  })

  const categories = await response.json()
 */
  return (
    <BaseTemplate>
      <Breadcrumb
        pageTitle="Lista de categorias"
        title="cadastrar"
        currentTitle="categorias"
      />
      <div className="wrapper-content">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </BaseTemplate>
  )
}

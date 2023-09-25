"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Key, Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import { z } from "zod"
import "react-toastify/dist/ReactToastify.css"

type LoginProps = {
  email: string
  password: string
}
const schema = z.object({
  email: z
    .string()
    .email("email não tem um formato válido")
    .nonempty({ message: "email é obrigatório" }),
  password: z
    .string()
    .min(4, "Senha deve conter no minimo 4 caracteres")
    .nonempty({ message: "senha é obrigatório" })
})

function Login() {
  const {
    register,
    handleSubmit,
    //setError,
    formState: { errors }
  } = useForm<LoginProps>({
    resolver: zodResolver(schema)
  })

  async function Authentication(data: LoginProps) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )
    const login = await response.json()

    if (login.error) {
      console.log("entrou")
      toast.error(login.message)
      return
    }

    localStorage.setItem("user", JSON.stringify(login.user))
    localStorage.setItem("token", JSON.stringify(login.access_token))
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex items-center justify-center h-full bg-neutral-800">
        <div className="max-w-[400px] w-full bg-neutral-700 rounded-md shadow-md flex flex-col items-center justify-center">
          <Lock size={40} className="mt-6 text-violet-600" />
          <form className="w-full" onSubmit={handleSubmit(Authentication)}>
            <div className="card">
              <div className=" card-body p-6">
                <div className="flex items-center gap-2 bg-neutral-800 pl-4 rounded-lg">
                  <span>
                    <Mail size={25} className="text-violet-600" />
                  </span>
                  <input
                    {...register("email")}
                    placeholder="Email"
                    className="input input-bordered focus:outline-0 w-full bg-neutral-800 text-gray-300"
                  />
                </div>
                <small className="text-red-500">{errors.email?.message}</small>
                <div className="flex items-center gap-2 bg-neutral-800 pl-4 rounded-lg my-3">
                  <span>
                    <Key size={25} className="text-violet-600" />
                  </span>
                  <input
                    {...register("password")}
                    placeholder="Senha"
                    className="input input-bordered w-full focus:outline-0 bg-neutral-800 text-gray-300"
                  />
                </div>
                <small className="text-red-500">
                  {errors.password?.message}
                </small>

                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login

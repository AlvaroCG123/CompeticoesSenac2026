import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import api from "../service/api"

interface LoginForm {
    email: string,
    senha: string
}
const Login = () => {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

    async function handleLogin(dados: LoginForm) {
        try {
            const respostaApi = await api.post("/usuario/login", dados)
            if (respostaApi.data.usuario.cargo === 'ADMIN') {
                navigate("/dashboard")
            } else if (respostaApi.data.usuario.cargo === 'CERIMONIALISTA') {
                navigate("/cerimonialista")
            }


            localStorage.setItem("@Wedding: token", respostaApi.data.token)
            localStorage.setItem("@Wedding: cargo", respostaApi.data.usuario.cargo)

            console.log(respostaApi.data)
        } catch (error) {
            alert("Fala no login: Email ou senha inválido")
            console.error("Falha no login", error)
        }
    }
    return (
        <main className="h-screen bg-amber-100 flex flex-col justify-center items-center">
            <div className="mb-10">
                <h1 className="text-5xl text-[#007C18] cinzel ">WEDDING PASS</h1>
                <hr className="border-[#FFC300]" />
            </div>
            <form className="bg-white flex flex-col p-10 max-w-130 rounded-3xl" onSubmit={handleSubmit(handleLogin)}>

                <h1 className="text-4xl my-1" >Email</h1>
                <input {...register("email", { required: "Email obrigatório" })} type="email" className="border p-2 rounded my-2" />
                {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}


                <h1 className="text-4xl my-3" >Senha</h1>
                <input {...register("senha", { required: "Senha obrigatório" })} type="password" className="border p-2 rounded" />
                {errors.senha && <span className="text-red-600 text-sm">{errors.senha.message}</span>}

                <button className="bg-[#E2725B] py-3 mt-5 rounded-2xl cursor-pointer">Entrar</button>
            </form>
        </main>
    )
}

export default Login
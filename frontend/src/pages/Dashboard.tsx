import { useEffect, useState } from "react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import api from "../service/api"
import { useForm } from "react-hook-form"
import { CircleCheckBig, CircleX, Pencil, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Dados {
    total: number,
    confirmados: number
    pendentes: number
}

interface ConvidadoDados {
    id: number,
    nome_completo: string,
    email: string,
    mesaId: number,
    telefone?: string,
    check_in: boolean
}

interface FormConvidado {
    nome_completo: string
    email: string,
    telefone: string,
    mesaId: number,
}

const Dashboard = () => {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormConvidado>()

    const [convidado, setConvidado] = useState<ConvidadoDados[]>([])
    const [dados, setDados] = useState<Dados>({ total: 0, confirmados: 0, pendentes: 0 })
    const [idEditando, setIdEditando] = useState<number | null>(null)
    const [OrdemMesa, setOrdemMesa] = useState<'padrão' | 'crescente' | 'decrescente'>('padrão')

    const navigate = useNavigate()

    function GerarPdf() {
        try {
            const doc = new jsPDF()
            doc.setFontSize(16)
            doc.text("Relatório de convidados - Casamento", 14, 15)
            doc.setFontSize(12)
            doc.text(`Total: ${dados.total} | Confirmados: ${dados.confirmados} | Pendentes: ${dados.pendentes}`, 14, 25)

            const colunas = ["Nome", "Email", "Mesa", "Status"]

            const linhas = convidado.map(c => [
                c.nome_completo,
                c.email,
                c.mesaId,
                c.check_in ? "CONFIRMADO" : "PENDENTE"
            ])

            autoTable(doc, {
                head: [colunas],
                body: linhas,
                startY: 35,
                styles: { fontSize: 10 },
                headStyles: { fillColor: [0, 124, 24] }

            })
            doc.save("lista_convidados.pdf")
        } catch (error) {
            alert("Erro ao gerar PDF")
        }
    }


    async function Estatisticas() {
        try {
            const token = localStorage.getItem("@Wedding: token")
            const respostaAPi = await api.get("/convidado/dashboard", { headers: { Authorization: `Bearer ${token}` } })

            setDados(respostaAPi.data)

        } catch (error) {
            console.error("Erro: ", error)
        }
    }

    async function DesfazerCheckin(id: number) {
        try {
            const token = localStorage.getItem("@Wedding: token")
            await api.patch(`/convidado/desfazercheckin/${id}`, null, { headers: { Authorization: `Bearer ${token}` } })
            const confirmar = window.confirm("Voce tem certeza?")
            if (!confirmar) return

            ListarConvidados()
            Estatisticas()
        } catch (error) {
            console.error("falha: ", error)
        }
    }

    async function ExcluirConvidado(id: number) {
        try {
            const token = localStorage.getItem("@Wedding: token")
            await api.delete(`/convidado/deletar/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            const confirmar = window.confirm("Voce tem certeza?")
            if (!confirmar) return

            ListarConvidados()
            Estatisticas()
        } catch (error) {
            console.error("falha: ", error)
        }
    }

    async function Checkin(id: number) {
        try {
            const token = localStorage.getItem("@Wedding: token")
            await api.patch(`/convidado/checkin/${id}`, null, { headers: { Authorization: `Bearer ${token}` } })

            const confirmar = window.confirm("Voce tem certeza?")
            if (!confirmar) return

            ListarConvidados()
            Estatisticas()
        } catch (error) {
            console.error("falha: ", error)
        }
    }

    async function HandleConviado(dados: FormConvidado) {
        try {
            const token = localStorage.getItem("@Wedding: token")
            const headers = { headers: { Authorization: `Bearer ${token}` } }

            if (idEditando) {
                await api.put(`/convidado/atualizar/${idEditando}`, dados, headers)
                alert("Convidado Atualizado com sucesso")
            } else {
                const respostaAPi = await api.post("/convidado/criar", dados, headers)

                console.log(respostaAPi.data)

                Estatisticas()
                ListarConvidados()
                reset()
                alert("Convidado Criado com sucesso")
            }

            Estatisticas()
            ListarConvidados()
            CancelarEdicao()
        } catch (error) {
            console.error("Erro: ", error)
            alert("erro ao criar convidado")
        }

    }

    function PreencherFormulario(convidadoSelecionado: ConvidadoDados) {
        setIdEditando(convidadoSelecionado.id)
        setValue("nome_completo", convidadoSelecionado.nome_completo)
        setValue("email", convidadoSelecionado.email)
        setValue("mesaId", convidadoSelecionado.mesaId)
        if (convidadoSelecionado.telefone) {
            setValue("telefone", convidadoSelecionado.telefone)
        }
    }

    async function CancelarEdicao() {
        setIdEditando(null)
        reset()
    }

    async function ListarConvidados() {
        try {
            const token = localStorage.getItem("@Wedding: token")
            const respostaAPi = await api.get("/convidado/listar", { headers: { Authorization: `Bearer ${token}` } })

            setConvidado(respostaAPi.data)

            console.log(respostaAPi.data)
        } catch (error) {
            console.error("Erro: ", error)
        }
    }

    async function Sair() {
        const confirmar = window.confirm("Voce tem certeza?")
        if (!confirmar) return
        localStorage.removeItem("@Wedding: token")
        navigate("/")
    }


    useEffect(() => {
        Estatisticas(),
            ListarConvidados()
    }, [])

    const convidadosOrdenados = [...convidado].sort((a, b) => {
        if (OrdemMesa === 'crescente') return a.mesaId - b.mesaId
        if (OrdemMesa === 'decrescente') return b.mesaId - a.mesaId
        return 0
    })

    return (
        <main className="bg-amber-100 min-h-screen">
            <nav className="p-5">
                <h1 className="text-6xl font-light cinzel text-[#007C18]">DASHBOARD: ADMIN</h1>
                <button onClick={() => Sair()} className="fixed right-40 top-0 bg-[#E2725B] py-3 mt-5 rounded-2xl cursor-pointer px-5 text-amber-50">Sair</button>
                <button onClick={() => GerarPdf()} className="fixed right-5 top-0 bg-[#E2725B] py-3 mt-5 rounded-2xl cursor-pointer px-5 text-amber-50">EXPORTAR</button>
                <hr />
            </nav>
            <section className=" flex justify-center gap-10">
                <div className=" border border-t-4 min-w-80 p-8 flex flex-col items-center space-y-5 rounded-3xl text-[#E2725B] bg-white">
                    <h1 className="text-4xl cinzel font-bold text-[#E2725B]">TOTAL</h1>
                    <h2 className="text-4xl cinzel font-medium">{dados.total}</h2>
                </div>
                <div className=" border border-t-4 min-w-80 p-8 flex flex-col items-center space-y-5 rounded-3xl text-[#007C18] bg-white">
                    <h1 className="text-4xl cinzel font-bold text-[#007C18]">CONFIRMADOS</h1>
                    <h2 className="text-4xl cinzel font-medium">{dados.confirmados}</h2>
                </div>
                <div className=" border border-t-4 min-w-80 p-8 flex flex-col items-center space-y-5 rounded-3xl text-[hsl(0,72%,39%)] bg-white">
                    <h1 className="text-4xl cinzel font-bold">PENDENTES</h1>
                    <h2 className="text-4xl cinzel font-medium">{dados.pendentes}</h2>
                </div>
            </section>
            <section className=" flex p-10 gap-30 justify-center">
                <div>
                    <form onSubmit={handleSubmit(HandleConviado)} className="bg-white flex flex-col p-10 max-w-100 rounded-3xl border" >
                        <h1 className="text-2xl">{idEditando ? "Atualizar Convidado" : "Criar Convidado"}</h1>

                        <h1 className="text-xl my-1" >Nome Completo</h1>

                        <input {...register("nome_completo", { required: "Nome obrigatório" })} type="text" className="border p-1 rounded my-2" />
                        {errors.nome_completo && <span className="text-red-600 text-sm">{errors.nome_completo.message}</span>}

                        <h1 className="text-xl my-1" >Email</h1>
                        <input {...register("email", { required: "Email obrigatório" })} type="email" className="border p-1 rounded my-2" />
                        {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}

                        <h1 className="text-xl my-1" >Telefone</h1>
                        <input {...register("telefone", { required: "Telefone obrigatório" })} type="text" className="border p-1 rounded my-2" />
                        {errors.telefone && <span className="text-red-600 text-sm">{errors.telefone.message}</span>}

                        <h1 className="text-xl my-1" >Mesa</h1>
                        <input {...register("mesaId", { required: "Mesa obrigatório", valueAsNumber: true })} type="number" className="border p-1 rounded my-2" />
                        {errors.mesaId && <span className="text-red-600 text-sm">{errors.mesaId.message}</span>}

                        <button className="bg-[#E2725B] py-3 mt-5 rounded-2xl cursor-pointer text-amber-50">{idEditando ? "Atualizar" : "Criar"}</button>
                        {idEditando && (
                            <button className="bg-[#E2725B] py-3 mt-5 rounded-2xl cursor-pointer text-amber-50" type="button" onClick={CancelarEdicao}>Cancelar Edicao</button>
                        )}
                    </form>
                </div>
                <div className="">
                    <div className="">
                        <table className="border">
                            <thead>
                                <tr>
                                    <th className="border-gray-800 p-3 bg-[#007C18] text-white px-8">Nome</th>
                                    <th className="border-gray-800 p-3 bg-[#007C18] text-white px-8">Dados</th>
                                    <th onClick={()=>{
                                        if(OrdemMesa === 'padrão') setOrdemMesa('crescente')
                                            else if(OrdemMesa === 'crescente') setOrdemMesa('decrescente')
                                        else setOrdemMesa('padrão')
                                    }}
                                    title="CLieque para ordenar o menu"
                                    className="border-gray-800 p-3 bg-[#007C18] text-white px-8">Mesa {OrdemMesa === 'crescente' ? '↑' : OrdemMesa === 'decrescente' ? '↓' : '↕' }</th>
                                    <th className="border-gray-800 p-3 bg-[#007C18] text-white px-8">Status</th>
                                    <th className="border-gray-800 p-3 bg-[#007C18] text-white px-8">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {convidadosOrdenados.map(c => (
                                    <tr key={c.id}>
                                        <td className="border p-3 bg-white">{c.nome_completo}</td>
                                        <td className="border p-3 bg-white">{c.email}</td>
                                        <td className="border p-3 bg-white">{c.mesaId}</td>
                                        <td className={`border p-3 bg-white ${c.check_in ? `text-green-800` : `text-red-500`}`}>{c.check_in ? 'CONFIRMADO' : 'PENDENTE'}</td>
                                        <td className="border p-3 bg-white">
                                            <div className="flex gap-2 justify-center">
                                                <Pencil onClick={() => PreencherFormulario(c)} className="cursor-pointer" />
                                                <Trash2 onClick={() => ExcluirConvidado(c.id)} className="cursor-pointer" />
                                                <CircleCheckBig onClick={() => Checkin(c.id)} className="cursor-pointer" />
                                                <CircleX onClick={() => DesfazerCheckin(c.id)} className="cursor-pointer" />
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Dashboard
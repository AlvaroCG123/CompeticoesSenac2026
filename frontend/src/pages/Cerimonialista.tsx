import React, { useEffect, useState } from "react"
import api from "../service/api"
import { useNavigate } from "react-router-dom"

interface ConvidadoDados {
    id: number,
    nome_completo: string,
    mesaId: number,
    check_in: boolean
}

const esperar = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Cerimonialista = () => {

    const [convidado, setConvidado] = useState<ConvidadoDados[]>([])

    const [carregando, setCarregando] = useState(true)
    
    const navigate = useNavigate()

    async function ListaConvidados() {
        try {
            

            const token = localStorage.getItem("@Wedding: token")
            const respostaApi = await api.get("/convidado/listar", { headers: { Authorization: `Bearer ${token}` } })
            
            await esperar(1000)
            setConvidado(respostaApi.data)
    
            console.log(respostaApi.data)
        } catch (error) {
            console.error(`Falha: `, error)
        }finally{

        }
    }

    async function Pesquisa(nome_completo: string) {
        const token = localStorage.getItem("@Wedding: token")
        const respostaApi = await api.get(`/convidado/pesquisa?nome_completo=${nome_completo}`, { headers: { Authorization: `Bearer ${token}` } })

        setConvidado(respostaApi.data)

        console.log(respostaApi.data)
    }

    async function PesquisaNMesa(mesaId: number) {
        const token = localStorage.getItem("@Wedding: token")
        const respostaAPi = await api.get(`/mesa/pesquisa?numero=${mesaId}`, { headers: { Authorization: `Bearer ${token}`}})
        setConvidado(respostaAPi.data)
    }

    

    function HandleMudancaInput(evento: React.ChangeEvent<HTMLInputElement>){
        const valorDigitado = evento.target.value
        if(valorDigitado === ''){
            ListaConvidados()
        }else{
            Pesquisa(valorDigitado)
        }
    }

    function OrdemPelaMesa(evento: React.ChangeEvent<HTMLInputElement>){
        const NumeroMesa = evento.target.value
        if(NumeroMesa === ''){
            ListaConvidados()
        }else{
            PesquisaNMesa(Number(NumeroMesa))
        }
    }

    async function Checkin(id: number) {
        try {
            const confirmar = window.confirm("Voce tem certeza?")
            if (!confirmar) return
            const token = localStorage.getItem("@Wedding: token")
            await api.patch(`/convidado/checkin/${id}`, null, { headers: { Authorization: `Bearer ${token}` } })
            console.log(token)
            

            ListaConvidados()
        } catch (error) {
            console.error("falha: ", error)

        }
    }

    async function Sair() {
        const confirmar = window.confirm("Voce tem certeza?")
            if (!confirmar) return
        localStorage.removeItem("@Wedding: token")
        navigate("/")
    }

    async function Exportar() {
        window.print()
    }

    useEffect(() => {
        ListaConvidados()
        setTimeout(()=>{
            setCarregando(false)
        }, 1000)

    }, [])

    return (
        <main className="min-h-screen bg-amber-100 flex flex-col items-center">
            <nav className="p-7 flex justify-center flex-col ">
                <h1 className="text-3xl font-light cinzel text-[#007C18]">Convidados</h1> <button onClick={() => Sair()} className="text-sm bg-[#E2725B] py-2 mt-5 rounded-md cursor-pointer px-5 text-amber-50">SAIR</button>
                <button onClick={() => Exportar()} className="text-sm bg-[#E2725B] py-2 mt-5 rounded-md cursor-pointer px-5 text-amber-50">EXPORTAR</button>
                <input type="text" onChange={HandleMudancaInput} className="bg-white p-2 mt-3 rounded-md" placeholder="Pesquise aqui..." />
                <input type="number" onChange={OrdemPelaMesa} className="bg-white p-2 mt-3 rounded-md" placeholder="Numero da mesa..." />
            </nav>
            <div className=" lg: min-w-100">
            {carregando ? (
                <div className="flex justify-center items-center mt-10">
                    <div className="w-12 h-12 border-4 border-amber-300 border-t-[#007C18] rounded-full animate-spin"></div>
                </div>
            ) :
            convidado.map(c => {
                const confirmadosNaMesa = convidado.filter(x => x.mesaId === c.mesaId && x.check_in).length
                return (
                    <div key={c.id} className="bg-amber-50 flex flex-col p-4 rounded-2xl my-5 mx-5">
                        <h1 className="text-3xl">{c.nome_completo}</h1>
                        <div className="flex justify-between">
                            <h2 className="text-2xl">Mesa: {c.mesaId}</h2>
                            <h2>({confirmadosNaMesa}/6)</h2>
                        </div>
                        <h1>{c.check_in ? 'CONFIRMADO' : 'PENDENTE'}</h1>
                        <button onClick={() => Checkin(c.id)} disabled={c.check_in} className={`py-3 m-2 rounded-2xl text-amber-50 ${
                            c.check_in
                            ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#e2725B] cursor-pointer'
                        }`}>Checkin</button>
                    </div>
                )
            })}
            </div>
        </main>
    )
}

export default Cerimonialista
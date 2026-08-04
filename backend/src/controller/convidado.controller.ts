import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

export async function estatisticasDashboard(req: Request, res: Response) {
    try {
        const total = await prisma.convidado.count()
        const confirmados = await prisma.convidado.count({ where:{ check_in: true }})
        const pendentes = total - confirmados

        res.status(200).json({total, confirmados, pendentes})
    } catch (error) {
        res.status(400).json({error:"Falha ao buscar estatisticas."})
        return
    }
}

export async function ListaConvidados(req: Request, res: Response) {
    try {
        const lista = await prisma.convidado.findMany({
            orderBy: { nome_completo: 'asc'}
        })
        res.status(200).json(lista)
    } catch (error) {
        res.status(400).json({error:"Falha a listar convidado."})
        return
    }
}

export async function CriarConvidado(req: Request, res: Response) {
    try {
        const { nome_completo, email, mesaId, telefone } = req.body

        if(!nome_completo || !email || !mesaId || !telefone){
            res.status(400).json({ mensagem:"Todos os dados sao obrigatórios."})
            return
        }

        const mesa = await prisma.mesa.findUnique({
  where: {
    id: mesaId,
  },
  include: {
    _count: {
      select: { convidado: true }, // Conta os registros na relação 'convidado'
    },
  },
});

if (!mesa) {
  throw new Error("Mesa não encontrada.");
}

// Verifica se a quantidade atual de convidados atingiu ou passou da capacidade
if (mesa._count.convidado >= mesa.capacidade) {
  throw new Error("A capacidade máxima desta mesa já foi atingida.");
}
        const criar = await prisma.convidado.create({
            data: {
                nome_completo, email, mesaId , telefone
            }
        })
        res.status(201).json(criar)
    } catch (error) {
        console.error("Falha, ", error)
        res.status(401).json({error:"Falha a criar convidado."})
        return
    }
}

export async function AtualizarConvidado(req: Request, res: Response) {
    try {
        const { nome_completo, email, telefone } = req.body
        const { id } = req.params

        if(!id){
            res.status(404).json({error: "ID Inválido."})
            return
        }

        if(!nome_completo || !email || !telefone){
            res.status(400).json({ mensagem:"Todos os dados sao obrigatórios."})
            return
        }

        const atualizar = await prisma.convidado.update({
            where: { id: Number(id) },
            data: {
                nome_completo, email, telefone
            }
        })
        res.status(201).json({mesagem:"Convidado atualizado: ", atualizar})
    } catch (error) {
        res.status(400).json({error:"Falha a atualizar convidado."})
        return
    }
}

export async function Checkin(req: Request, res: Response) {
    try {
        const { id } = req.params

        if(!id){
            res.status(404).json({error: "ID Inválido."})
            return
        }

        const convidado = await prisma.convidado.findUnique({
            where: { id: Number(id) }
        })

        if(!convidado){
            res.status(404).json({error:"Usuario não encontrado."})
        }
        
        if(convidado?.check_in === true){
            res.status(400).json({error:"Convidado ja fez checkin."})
        }
        const checkin = await prisma.convidado.update({
            where: { id: Number(id) },
            data: {
                check_in: true, horario_checkin: new Date()
            }
        })
        res.status(201).json(checkin)
    } catch (error) {
        res.status(400).json({error:"Falha no Check-in."})
        return
    }
}

export async function desfazerCheckin(req: Request, res: Response) {
    try {
        const { id } = req.params

        if(!id){
            throw res.status(404).json({error: "ID Inválido."})
            
        }

        const convidado = await prisma.convidado.findUnique({
            where: { id: Number(id) }
        })

        if(!convidado){
            res.status(404).json({error:"Convidado não encontrado."})
            return
        }
        
        if(convidado?.check_in === false){
            res.status(400).json({error:"Este convidado ainda não fez Check-in."})
        }
        const desfazercheckin = await prisma.convidado.update({
            where: { id: Number(id) },
            data: {
                check_in: false, horario_checkin: null
            }
        })
        res.status(200).json({mesagem:"Convidado atualizado: ", desfazercheckin})
    } catch (error) {
        res.status(400).json({error:"Falha ao desfazer check-in."})
        return
    }
}

export async function deletarConvidado(req: Request, res: Response) {
    try {
        const { id } = req.params

        if(!id){
            res.status(404).json({error: "ID Inválido."})
            return
        }

        const convidado = await prisma.convidado.findUnique({
            where: { id: Number(id) }
        })

        if(!convidado){
            res.status(404).json({error:"Usuario não encontrado."})
        }

        const deletar = await prisma.convidado.delete({
            where: { id: Number(id) },
        })
        res.status(201).json({mesagem:"Convidado deletado: ", deletar})
    } catch (error) {
        res.status(400).json({error:"Falha ao deletar convidado."})
        return
    }
}

export async function PesquisaNome(req: Request, res: Response) {
    try {
        const { nome_completo } = req.query

        if(!nome_completo || typeof nome_completo !== `string`){
            res.status(400).json({error:`Parametro de pesquisa invalida`})
            return
        }

        const resultados = await prisma.convidado.findMany({
            where: {
                nome_completo:{
                    contains: nome_completo
                }
            },
            orderBy:{
                nome_completo: `asc`
            }

        })
        res.status(200).json(resultados)
    } catch (error) {
        console.error("Falha na pesquisa: ", error)
        res.status(400).json({error: "Falha ao realizar a pesquisa"})
        return
    }
}
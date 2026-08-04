import type { Request, Response } from "express"
import { prisma } from "../../lib/prisma.js"

export async function ListarMesa(req: Request, res: Response) {
    try {
        const listar = await prisma.mesa.findMany({
            select:{
                numero:true,
                capacidade: true,
                convidado: {
                    select:{
                        nome_completo:true,
                        check_in:true
                    }
                }
            }
        })

        res.status(201).json(listar)
    } catch (error) {
        res.status(400).json({error:"Falha a listar usuario."})
        return
    }
}

export async function ConfirmadosMesa(req: Request, res: Response) {
    try {
        const { numero } = req.query

        if (!numero) {
            res.status(400).json({ error: "Informe o número da mesa." })
            return
        }

        const mesa = await prisma.mesa.findUnique({
            where: { numero: Number(numero) },
            select: {
                id: true,
                numero: true,
                capacidade: true
            }
        })

        if (!mesa) {
            res.status(404).json({ error: "Mesa não encontrada." })
            return
        }

        const confirmados = await prisma.convidado.count({
            where: {
                mesaId: mesa.id,
                check_in: true
            }
        })

        res.status(200).json({
            numero: mesa.numero,
            capacidade: mesa.capacidade,
            confirmados
        })
    } catch (error) {
        res.status(400).json({ error: "Falha ao contar confirmados da mesa." })
        return
    }
}

export async function PesquisarMesa(req: Request, res: Response) {
    try {

        const { numero } = req.query

        const mesa = await prisma.mesa.findUnique({
            where: { numero: Number(numero) },
            select: {
                convidado: {
                    select: {
                        id: true,
                        nome_completo: true,
                        check_in: true,
                        mesaId: true
                    }
                }
            }
        })

        if(!mesa){
            res.status(404).json({error:"Mesa não encontrada."})
            return
        }

        res.status(200).json(mesa.convidado)
    } catch (error) {
        res.status(400).json({error:"Falha a listar usuario."})
        return
    }
}


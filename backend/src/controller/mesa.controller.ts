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

export async function PesquisarMesa(req: Request, res: Response) {
    try {

        const { numero } = req.query

        const mesa = await prisma.mesa.findUnique({
            where: { numero: Number(numero) }
        })

        if(!mesa){
            res.status(404).json({error:"Mesa não encontrada."})
            return
        }

        const listar = await prisma.mesa.findMany({
            where: { numero: Number(numero) },
            select:{
                numero:true,
                capacidade: true,
            }
        })

        res.status(201).json({mesagem:"Usuario criado: ", listar})
    } catch (error) {
        res.status(400).json({error:"Falha a listar usuario."})
        return
    }
}


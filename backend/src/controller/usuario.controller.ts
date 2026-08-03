import type { Request, Response } from "express"
import { prisma } from "../../lib/prisma.js"

export async function ListarUsuario(req: Request, res: Response) {
    try {
        const listar = await prisma.usuario.findMany({

        })

        res.status(201).json({mesagem:"Usuario criado: ", listar})
    } catch (error) {
        res.status(400).json({error:"Falha a listar usuario."})
        return
    }
}
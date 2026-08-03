import { Router } from "express";
import { AuthMiddleware, VerificarCargo } from "../middleware/AuthMiddleware.js";
import { ListarMesa, PesquisarMesa } from "../controller/mesa.controller.js";

const router = Router()

router.get("/listar", AuthMiddleware, VerificarCargo(['ADMIN']), ListarMesa)
router.get("/pesquisa", AuthMiddleware, VerificarCargo(['ADMIN']), PesquisarMesa)

export default router
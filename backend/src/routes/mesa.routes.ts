import { Router } from "express";
import { AuthMiddleware, VerificarCargo } from "../middleware/AuthMiddleware.js";
import { ConfirmadosMesa, ListarMesa, PesquisarMesa } from "../controller/mesa.controller.js";

const router = Router()

router.get("/listar", AuthMiddleware, VerificarCargo(['ADMIN']), ListarMesa)
router.get("/pesquisa", AuthMiddleware, VerificarCargo(['ADMIN', 'CERIMONIALISTA']), PesquisarMesa)
router.get("/confirmados", AuthMiddleware, VerificarCargo(['ADMIN', 'CERIMONIALISTA']), ConfirmadosMesa)

export default router
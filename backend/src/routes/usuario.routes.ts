import { Router } from "express";
import { Login } from "../controller/auth.controller.js";
import { ListarUsuario } from "../controller/usuario.controller.js";
import { AuthMiddleware, VerificarCargo } from "../middleware/AuthMiddleware.js";

const router = Router()

router.get("/listar", AuthMiddleware, VerificarCargo(['ADMIN']), ListarUsuario)
router.post("/login", Login)

export default router
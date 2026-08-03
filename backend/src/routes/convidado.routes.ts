import { Router } from "express";
import { AtualizarConvidado, Checkin, CriarConvidado, deletarConvidado, desfazerCheckin, estatisticasDashboard, ListaConvidados, PesquisaNome } from "../controller/convidado.controller.js";
import { AuthMiddleware, VerificarCargo } from "../middleware/AuthMiddleware.js";

const router = Router()

router.use(AuthMiddleware)

//SOMENTE ADMIN
router.get("/dashboard", estatisticasDashboard)
router.post("/criar", VerificarCargo(["ADMIN"]), CriarConvidado)
router.put("/atualizar/:id",VerificarCargo(["ADMIN"]), AtualizarConvidado)
router.patch("/desfazercheckin/:id",VerificarCargo(["ADMIN"]), desfazerCheckin)
router.delete("/deletar/:id",VerificarCargo(["ADMIN"]), deletarConvidado)


//ADMIN E CERIMONIALISTA

router.get("/listar", VerificarCargo(["ADMIN","CERIMONIALISTA"]), ListaConvidados)
router.get("/pesquisa", VerificarCargo(["ADMIN","CERIMONIALISTA"]), PesquisaNome)
router.patch("/checkin/:id",VerificarCargo(["ADMIN","CERIMONIALISTA"]), Checkin)

export default router
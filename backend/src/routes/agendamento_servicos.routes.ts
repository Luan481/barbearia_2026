import { Request, Response, Router } from "express"
import { agendamentoServicoService } from "../services/agendamento_servicos.service"
import { CriarAgendamentoServico } from "../types/agendamento_servicos"
import { isUuid, responderErro } from "./route-utils"

export const agendamentoServicoRouter = Router()

agendamentoServicoRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await agendamentoServicoService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

agendamentoServicoRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await agendamentoServicoService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

agendamentoServicoRouter.post("/", async (request: Request<{}, {}, CriarAgendamentoServico>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await agendamentoServicoService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

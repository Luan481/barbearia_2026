import { Request, Response, Router } from "express"
import { agendamentoService } from "../services/agendamentos.service"
import { CriarAgendamento, AtualizarAgendamento } from "../types/agendamentos"
import { isUuid, responderErro } from "./route-utils"

export const agendamentoRouter = Router()

agendamentoRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await agendamentoService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

agendamentoRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await agendamentoService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

agendamentoRouter.post("/", async (request: Request<{}, {}, CriarAgendamento>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await agendamentoService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

agendamentoRouter.patch("/:id", async (request: Request<{ id: string }, {}, AtualizarAgendamento>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    if (!request.body || !["status","valor"].some(campo => (request.body as Record<string, unknown>)[campo] !== undefined)) {
        return response.status(400).json({ message: "Informe um campo permitido para atualizar" })
    }
    try {
        const resultado = await agendamentoService.update(request.params.id, request.body)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

import { Request, Response, Router } from "express"
import { horarioService } from "../services/horarios.service"
import { CriarHorario, AtualizarHorario } from "../types/horarios"
import { isUuid, responderErro } from "./route-utils"

export const horarioRouter = Router()

horarioRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await horarioService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

horarioRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await horarioService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

horarioRouter.post("/", async (request: Request<{}, {}, CriarHorario>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await horarioService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

horarioRouter.patch("/:id", async (request: Request<{ id: string }, {}, AtualizarHorario>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    if (!request.body || !["disponivel"].some(campo => (request.body as Record<string, unknown>)[campo] !== undefined)) {
        return response.status(400).json({ message: "Informe um campo permitido para atualizar" })
    }
    try {
        const resultado = await horarioService.update(request.params.id, request.body)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

import { Request, Response, Router } from "express"
import { assinaturaService } from "../services/assinaturas.service"
import { CriarAssinatura, AtualizarAssinatura } from "../types/assinaturas"
import { isUuid, responderErro } from "./route-utils"

export const assinaturaRouter = Router()

assinaturaRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await assinaturaService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

assinaturaRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await assinaturaService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

assinaturaRouter.post("/", async (request: Request<{}, {}, CriarAssinatura>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await assinaturaService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

assinaturaRouter.patch("/:id", async (request: Request<{ id: string }, {}, AtualizarAssinatura>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    if (!request.body || !["data_fim","cortes_utilizados","status"].some(campo => (request.body as Record<string, unknown>)[campo] !== undefined)) {
        return response.status(400).json({ message: "Informe um campo permitido para atualizar" })
    }
    try {
        const resultado = await assinaturaService.update(request.params.id, request.body)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

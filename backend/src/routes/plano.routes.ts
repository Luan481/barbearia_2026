import { Request, Response, Router } from "express"
import { planoService } from "../services/plano.service"
import { CriarPlano } from "../types/planos"
import { isUuid, responderErro } from "./route-utils"

export const planoRouter = Router()

planoRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await planoService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

planoRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await planoService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

planoRouter.post("/", async (request: Request<{}, {}, CriarPlano>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await planoService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

planoRouter.patch("/ativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await planoService.ativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

planoRouter.patch("/inativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await planoService.inativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

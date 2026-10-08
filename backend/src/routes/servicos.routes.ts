import { Request, Response, Router } from "express"
import { servicoService } from "../services/sevicos.service"
import { CriarServico } from "../types/servicos"
import { isUuid, responderErro } from "./route-utils"

export const servicoRoute = Router()

servicoRoute.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await servicoService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

servicoRoute.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await servicoService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

servicoRoute.post("/", async (request: Request<{}, {}, CriarServico>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await servicoService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

servicoRoute.patch("/ativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await servicoService.ativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

servicoRoute.patch("/inativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await servicoService.inativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

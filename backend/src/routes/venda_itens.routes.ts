import { Request, Response, Router } from "express"
import { vendaItemService } from "../services/venda_itens.service"
import { CriarVendaItem } from "../types/venda_itens"
import { isUuid, responderErro } from "./route-utils"

export const vendaItemRouter = Router()

vendaItemRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await vendaItemService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

vendaItemRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await vendaItemService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

vendaItemRouter.post("/", async (request: Request<{}, {}, CriarVendaItem>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await vendaItemService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

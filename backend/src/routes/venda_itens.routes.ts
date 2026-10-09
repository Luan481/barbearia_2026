import { Request, Response, Router } from "express"
import { vendaItemService } from "../services/venda_itens.service"
import { CriarVendaItem } from "../types/venda_itens"

export const vendaItemRouter = Router()

vendaItemRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await vendaItemService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

vendaItemRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await vendaItemService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

vendaItemRouter.post("/", async (request: Request<{}, {}, CriarVendaItem>, response: Response) => {
    try {
        return response.status(201).json(await vendaItemService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

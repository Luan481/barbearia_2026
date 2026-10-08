import { Request, Response, Router } from "express"
import { vendaService } from "../services/vendas.service"
import { CriarVenda, AtualizarVenda } from "../types/vendas"

export const vendaRouter = Router()

vendaRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await vendaService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

vendaRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await vendaService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

vendaRouter.post("/", async (request: Request<{}, {}, CriarVenda>, response: Response) => {
    try {
        return response.status(201).json(await vendaService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

vendaRouter.patch("/:id", async (request: Request<{ id: string }, {}, AtualizarVenda>, response: Response) => {
    try {
        const resultado = await vendaService.update(request.params.id, request.body)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

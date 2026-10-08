import { Request, Response, Router } from "express"
import { planoService } from "../services/plano.service"
import { CriarPlano } from "../types/planos"

export const planoRouter = Router()

planoRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await planoService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

planoRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await planoService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

planoRouter.post("/", async (request: Request<{}, {}, CriarPlano>, response: Response) => {
    try {
        return response.status(201).json(await planoService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

planoRouter.patch("/ativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await planoService.ativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

planoRouter.patch("/inativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await planoService.inativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

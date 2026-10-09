import { Request, Response, Router } from "express"
import { assinaturaService } from "../services/assinaturas.service"
import { CriarAssinatura, AtualizarAssinatura } from "../types/assinaturas"

export const assinaturaRouter = Router()

assinaturaRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await assinaturaService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

assinaturaRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await assinaturaService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

assinaturaRouter.post("/", async (request: Request<{}, {}, CriarAssinatura>, response: Response) => {
    try {
        return response.status(201).json(await assinaturaService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

assinaturaRouter.patch("/:id", async (request: Request<{ id: string }, {}, AtualizarAssinatura>, response: Response) => {
    try {
        const resultado = await assinaturaService.update(request.params.id, request.body)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

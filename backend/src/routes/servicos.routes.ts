import { Request, Response, Router } from "express"
import { servicoService } from "../services/sevicos.service"
import { CriarServico } from "../types/servicos"

export const servicoRoute = Router()

servicoRoute.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await servicoService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

servicoRoute.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await servicoService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

servicoRoute.post("/", async (request: Request<{}, {}, CriarServico>, response: Response) => {
    try {
        return response.status(201).json(await servicoService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

servicoRoute.patch("/ativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await servicoService.ativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

servicoRoute.patch("/inativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await servicoService.inativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

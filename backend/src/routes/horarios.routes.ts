import { Request, Response, Router } from "express"
import { horarioService } from "../services/horarios.service"
import { CriarHorario, AtualizarHorario } from "../types/horarios"

export const horarioRouter = Router()

horarioRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await horarioService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

horarioRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await horarioService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

horarioRouter.post("/", async (request: Request<{}, {}, CriarHorario>, response: Response) => {
    try {
        return response.status(201).json(await horarioService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

horarioRouter.patch("/:id", async (request: Request<{ id: string }, {}, AtualizarHorario>, response: Response) => {
    try {
        const resultado = await horarioService.update(request.params.id, request.body)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

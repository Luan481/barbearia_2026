import { Request, Response, Router } from "express"
import { agendamentoService } from "../services/agendamentos.service"
import { CriarAgendamento, AtualizarAgendamento } from "../types/agendamentos"

export const agendamentoRouter = Router()

agendamentoRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await agendamentoService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

agendamentoRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await agendamentoService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

agendamentoRouter.post("/", async (request: Request<{}, {}, CriarAgendamento>, response: Response) => {
    try {
        return response.status(201).json(await agendamentoService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

agendamentoRouter.patch("/:id", async (request: Request<{ id: string }, {}, AtualizarAgendamento>, response: Response) => {
    try {
        const resultado = await agendamentoService.update(request.params.id, request.body)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

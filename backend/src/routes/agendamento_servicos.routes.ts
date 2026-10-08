import { Request, Response, Router } from "express"
import { agendamentoServicoService } from "../services/agendamento_servicos.service"
import { CriarAgendamentoServico } from "../types/agendamento_servicos"

export const agendamentoServicoRouter = Router()

agendamentoServicoRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await agendamentoServicoService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

agendamentoServicoRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await agendamentoServicoService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

agendamentoServicoRouter.post("/", async (request: Request<{}, {}, CriarAgendamentoServico>, response: Response) => {
    try {
        return response.status(201).json(await agendamentoServicoService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

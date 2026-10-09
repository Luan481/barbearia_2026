import { Request, Response, Router } from "express"
import { beneficioAniversarioService } from "../services/beneficios_aniversario.service"
import { CriarBeneficioAniversario, AtualizarBeneficioAniversario } from "../types/beneficios_aniversario"

export const beneficioAniversarioRouter = Router()

beneficioAniversarioRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await beneficioAniversarioService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

beneficioAniversarioRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await beneficioAniversarioService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

beneficioAniversarioRouter.post("/", async (request: Request<{}, {}, CriarBeneficioAniversario>, response: Response) => {
    try {
        return response.status(201).json(await beneficioAniversarioService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

beneficioAniversarioRouter.patch("/:id", async (request: Request<{ id: string }, {}, AtualizarBeneficioAniversario>, response: Response) => {
    try {
        const resultado = await beneficioAniversarioService.update(request.params.id, request.body)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

import { Request, Response, Router } from "express"
import { beneficioAniversarioService } from "../services/beneficios_aniversario.service"
import { CriarBeneficioAniversario, AtualizarBeneficioAniversario } from "../types/beneficios_aniversario"
import { isUuid, responderErro } from "./route-utils"

export const beneficioAniversarioRouter = Router()

beneficioAniversarioRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await beneficioAniversarioService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

beneficioAniversarioRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await beneficioAniversarioService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

beneficioAniversarioRouter.post("/", async (request: Request<{}, {}, CriarBeneficioAniversario>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await beneficioAniversarioService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

beneficioAniversarioRouter.patch("/:id", async (request: Request<{ id: string }, {}, AtualizarBeneficioAniversario>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    if (!request.body || !["utilizado"].some(campo => (request.body as Record<string, unknown>)[campo] !== undefined)) {
        return response.status(400).json({ message: "Informe um campo permitido para atualizar" })
    }
    try {
        const resultado = await beneficioAniversarioService.update(request.params.id, request.body)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

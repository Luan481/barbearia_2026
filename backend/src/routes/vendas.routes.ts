import { Request, Response, Router } from "express"
import { vendaService } from "../services/vendas.service"
import { CriarVenda, AtualizarVenda } from "../types/vendas"
import { isUuid, responderErro } from "./route-utils"

export const vendaRouter = Router()

vendaRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await vendaService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

vendaRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await vendaService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

vendaRouter.post("/", async (request: Request<{}, {}, CriarVenda>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await vendaService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

vendaRouter.patch("/:id", async (request: Request<{ id: string }, {}, AtualizarVenda>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    if (!request.body || !["valor_total","forma_pagamento"].some(campo => (request.body as Record<string, unknown>)[campo] !== undefined)) {
        return response.status(400).json({ message: "Informe um campo permitido para atualizar" })
    }
    try {
        const resultado = await vendaService.update(request.params.id, request.body)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

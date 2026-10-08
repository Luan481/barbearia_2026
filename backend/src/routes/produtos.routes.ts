import { Request, Response, Router } from "express"
import { produtosService } from "../services/produtos.service"
import { CriarProdutos } from "../types/produtos"
import { isUuid, responderErro } from "./route-utils"

export const produtoRouter = Router()

produtoRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await produtosService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

produtoRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await produtosService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

produtoRouter.post("/", async (request: Request<{}, {}, CriarProdutos>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await produtosService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

produtoRouter.patch("/ativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await produtosService.ativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

produtoRouter.patch("/inativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await produtosService.inativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

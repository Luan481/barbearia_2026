import { Request, Response, Router } from "express"
import { produtosService } from "../services/produtos.service"
import { CriarProdutos } from "../types/produtos"

export const produtoRouter = Router()

produtoRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await produtosService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

produtoRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await produtosService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

produtoRouter.post("/", async (request: Request<{}, {}, CriarProdutos>, response: Response) => {
    try {
        return response.status(201).json(await produtosService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

produtoRouter.patch("/ativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await produtosService.ativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

produtoRouter.patch("/inativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await produtosService.inativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

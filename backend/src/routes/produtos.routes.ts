import { Request, Response, Router } from "express"
import { produtosService } from "../services/produtos.service"
import { CriarProdutos } from "../types/produtos"

export const produtoRouter = Router()

produtoRouter.get("/", async (_request: Request, response: Response) => {
    try {
        const res = await produtosService.getAll()

        return response.json(res)
    } catch (error) {
        console.error(error)

        return response.status(500).json({
            error: "Erro Interno"
        })
    }

})

produtoRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const id = String(request.params.id);

        if (!String(id)) {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        const produto = await produtosService.getById(id);

        return response.json(produto);
    } catch (error) {
        console.error(error);

        return response.status(404).json({
            message: "Produto não encontrado",
        });
    }
});

produtoRouter.post("/", async (_request: Request<{}, {}, CriarProdutos>, response: Response) => {
    try {
        const dados = _request.body

        const product = await produtosService.create(dados)

        return response.status(201).json(product);
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            message: "Erro ao criar produto",
        });
    }
})

produtoRouter.patch("/inativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const id = request.params.id

        if (!String(id)) {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        const product = await produtosService.inativar(id);

        response.status(200).json({ mensagem: `Cliente inativado!` })
        return response.json(product);

    }
    catch (error) {
        console.error(error);

        return response.status(404).json({
            message: "Produto não encontrado",
        });
    }
})

produtoRouter.patch("/ativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const id = request.params.id

        if (!String(id)) {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        const product = await produtosService.ativar(id);

        response.status(200).json({ mensagem: `Produto ativado!` })
        return response.json(product);

    }
    catch (error) {
        console.error(error);

        return response.status(404).json({
            message: "Produto não encontrado",
        });
    }
})
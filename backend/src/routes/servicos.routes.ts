import { Response, Router, Request } from "express";
import { servicoService } from "../services/sevicos.service";
import { CriarServico } from "../types/servicos";

export const servicoRoute = Router()

servicoRoute.get("/", async (_request: Request, response: Response) => {
    try {
        const res = servicoService.getAll()

        return response.json(res)
    }
    catch (error) {
        console.error('Erro ao buscar serviços', error)
        throw new Error('Erro no banco de dados')
    }
})

servicoRoute.post("/", async (_request: Request<{}, {}, CriarServico>, response: Response) => {
    try {
        const dados = _request.body

        const servico = servicoService.create(dados)

        return response.status(201).json(servico)
    }
    catch (error) {
        console.error(error);

        return response.status(500).json({
            message: "Erro ao criar serviço",
        });

    }
})

servicoRoute.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const id = String(request.params.id);

        if (!String(id)) {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        const cliente = await servicoService.getById(id);

        return response.json(cliente);
    } catch (error) {
        console.error(error);

        return response.status(404).json({
            message: "Cliente não encontrado",
        });
    }
});
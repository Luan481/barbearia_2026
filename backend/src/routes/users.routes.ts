import { Router, Request, type Response } from "express";
import { userService } from "../services/users.service";
import { CriarUser, User } from "../types/usuarios";

export const usersRouter = Router()

usersRouter.get("/", async (_request: Request, response: Response) => {
    try {
        const res = await userService.getAll()

        return response.json(res)
    } catch (error) {
        console.error(error)

        return response.status(500).json({
            error: "Erro Interno"
        })
    }

})

usersRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const id = String(request.params.id);

        if (!String(id)) {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        const cliente = await userService.getById(id);

        return response.json(cliente);
    } catch (error) {
        console.error(error);

        return response.status(404).json({
            message: "Cliente não encontrado",
        });
    }
});

usersRouter.post("/", async (_request: Request<{}, {}, CriarUser>, response: Response) => {
    try {
        const dados = _request.body

        const user = await userService.create(dados)

        return response.status(201).json(user);
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            message: "Erro ao criar usuarios",
        });
    }
})

usersRouter.patch("/inativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const id = request.params.id

        if (!String(id)) {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        const cliente = await userService.inativar(id);

        response.status(200).json({mensagem: `Cliente inativado!`})
        return response.json(cliente);

    }
    catch (error) {
        console.error(error);

        return response.status(404).json({
            message: "Cliente não encontrado",
        });
    }
})

usersRouter.patch("/ativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const id = request.params.id

        if (!String(id)) {
            return response.status(400).json({
                message: "ID inválido",
            });
        }

        const cliente = await userService.ativar(id);

        response.status(200).json({mensagem: `Cliente ativado!`})
        return response.json(cliente);

    }
    catch (error) {
        console.error(error);

        return response.status(404).json({
            message: "Cliente não encontrado",
        });
    }
})
import { Router, Request, type Response } from "express";
import { userService } from "../services/users.service";
import { CriarUser } from "../types/usuarios";

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
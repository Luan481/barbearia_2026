import { Request, Response, Router } from "express"
import { userService } from "../services/users.service"
import { CriarUser } from "../types/usuarios"

export const usersRouter = Router()

usersRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await userService.getAll())
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

usersRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await userService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

usersRouter.post("/", async (request: Request<{}, {}, CriarUser>, response: Response) => {
    try {
        return response.status(201).json(await userService.create(request.body))
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

usersRouter.patch("/ativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await userService.ativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

usersRouter.patch("/inativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    try {
        const resultado = await userService.inativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro interno" })
    }
})

import { Request, Response, Router } from "express"
import { userService } from "../services/users.service"
import { CriarUser } from "../types/usuarios"
import { isUuid, responderErro } from "./route-utils"

export const usersRouter = Router()

usersRouter.get("/", async (_request: Request, response: Response) => {
    try {
        return response.json(await userService.getAll())
    } catch (error) {
        return responderErro(response, error)
    }
})

usersRouter.get("/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await userService.getById(request.params.id)
        if (!resultado.length) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

usersRouter.post("/", async (request: Request<{}, {}, CriarUser>, response: Response) => {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body)) {
        return response.status(400).json({ message: "Corpo da requisição inválido" })
    }
    try {
        return response.status(201).json(await userService.create(request.body))
    } catch (error) {
        return responderErro(response, error)
    }
})

usersRouter.patch("/ativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await userService.ativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

usersRouter.patch("/inativar/:id", async (request: Request<{ id: string }>, response: Response) => {
    if (!isUuid(request.params.id)) return response.status(400).json({ message: "ID inválido" })
    try {
        const resultado = await userService.inativar(request.params.id)
        if (!resultado) return response.status(404).json({ message: "Registro não encontrado" })
        return response.json(resultado)
    } catch (error) {
        return responderErro(response, error)
    }
})

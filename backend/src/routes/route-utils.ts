import { Response } from "express"

export function isUuid(id: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

export function responderErro(response: Response, error: unknown) {
    console.error(error)
    const code = (error as { code?: string } | null)?.code
    if (code === "23505") return response.status(409).json({ message: "Registro já existe" })
    if (code && ["23502", "23503", "23514", "22P02", "22007", "22008", "22003", "22001"].includes(code)) {
        return response.status(400).json({ message: "Dados inválidos ou referência inexistente" })
    }
    return response.status(500).json({ message: "Erro no banco de dados" })
}

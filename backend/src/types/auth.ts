export interface Login {
    id: string
    nome: string
    email: string
    senha: string
    telefone: string | null
    data_nascimento: string | null
    tipo: string
    ativo: boolean
}

export interface LoginData {
    email: string
    senha: string
}

export interface LoginResponse {
    nome:string
    email: string
    tipo: string
    token: string
}
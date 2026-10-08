export interface CriarUser {
    nome: string
    email: string
    senha: string
    telefone?: string | null
    data_nascimento?: string | null
    nascimento?: string | null
    tipo?: string
    ativo?: boolean
}

export interface User {
    id: string
    nome: string
    email: string
    senha: string
    telefone: string | null
    data_nascimento: string | null
    tipo: string
    ativo: boolean
}

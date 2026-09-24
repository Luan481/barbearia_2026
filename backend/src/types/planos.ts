export interface Plano {
    id: string
    nome: string
    quantidade_cortes: number
    preco: number
    ativo: boolean
}

export interface CriarPlano {
    nome: string
    quantidade_cortes: number
    preco: number
    ativo: boolean
}
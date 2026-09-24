export interface Produtos {
    id: string
    nome: string
    preco: number
    estoque: number
    ativo: boolean
}

export interface CriarProdutos {
    nome: string
    preco: number
    estoque: number
    ativo: boolean
}
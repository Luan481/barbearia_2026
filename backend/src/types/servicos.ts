export interface Servico {
    id: string
    nome: string
    descricao: string
    duracao: number
    preco: number
    ativo: boolean
}
export interface CriarServico {
    nome: string
    descricao: string
    duracao: number
    preco: number
    ativo: boolean
}
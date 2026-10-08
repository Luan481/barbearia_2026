export interface VendaItem {
    id: string
    venda_id: string
    produto_id: string
    quantidade: number
    preco: number
}

export interface CriarVendaItem {
    venda_id: string
    produto_id: string
    quantidade: number
    preco: number
}

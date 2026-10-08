export interface Venda {
    id: string
    cliente_id: string | null
    data: string
    valor_total: number
    forma_pagamento: string | null
}

export interface CriarVenda {
    cliente_id?: string | null
    data?: string
    valor_total?: number
    forma_pagamento?: string | null
}

export type AtualizarVenda = Partial<Pick<Venda, "valor_total" | "forma_pagamento">>

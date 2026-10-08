export interface Assinatura {
    id: string
    cliente_id: string
    plano_id: string
    data_inicio: string
    data_fim: string | null
    cortes_utilizados: number
    status: string
}

export interface CriarAssinatura {
    cliente_id: string
    plano_id: string
    data_inicio: string
    data_fim?: string | null
    cortes_utilizados?: number
    status?: string
}

export type AtualizarAssinatura = Partial<Pick<Assinatura, "data_fim" | "cortes_utilizados" | "status">>

export interface Agendamento {
    id: string
    cliente_id: string
    barbeiro_id: string
    data: string
    hora: string
    status: string
    valor: number
}

export interface CriarAgendamento {
    cliente_id: string
    barbeiro_id: string
    data: string
    hora: string
    status?: string
    valor?: number
}

export type AtualizarAgendamento = Partial<Pick<Agendamento, "status" | "valor">>

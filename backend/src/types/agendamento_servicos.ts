export interface AgendamentoServico {
    id: string
    agendamento_id: string
    servico_id: string
    preco: number
}

export interface CriarAgendamentoServico {
    agendamento_id: string
    servico_id: string
    preco: number
}

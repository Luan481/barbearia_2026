export interface Horario {
    id: string
    barbeiro_id: string
    data: string
    hora: string
    disponivel: boolean
}

export interface CriarHorario {
    barbeiro_id: string
    data: string
    hora: string
    disponivel?: boolean
}

export type AtualizarHorario = Partial<Pick<Horario, "disponivel">>

export interface BeneficioAniversario {
    id: string
    cliente_id: string
    ano: number
    utilizado: boolean
}

export interface CriarBeneficioAniversario {
    cliente_id: string
    ano: number
    utilizado?: boolean
}

export type AtualizarBeneficioAniversario = Partial<Pick<BeneficioAniversario, "utilizado">>

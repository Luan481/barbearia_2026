import { pool } from "../database/connection"
import { AgendamentoServico, CriarAgendamentoServico } from "../types/agendamento_servicos"

class AgendamentoServicoService {
    async getAll(): Promise<AgendamentoServico[]> {
        const res = await pool.query<AgendamentoServico>("SELECT * FROM agendamento_servicos")
        return res.rows
    }

    async getById(id: string): Promise<AgendamentoServico[]> {
        const res = await pool.query<AgendamentoServico>("SELECT * FROM agendamento_servicos WHERE id = $1", [id])
        return res.rows
    }

    async create(dados: CriarAgendamentoServico): Promise<AgendamentoServico> {
        const res = await pool.query<AgendamentoServico>(
            "INSERT INTO agendamento_servicos (agendamento_id, servico_id, preco) VALUES ($1, $2, $3) RETURNING *",
            [dados.agendamento_id, dados.servico_id, dados.preco]
        )
        return res.rows[0]
    }
}

export const agendamentoServicoService = new AgendamentoServicoService()

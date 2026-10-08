import { pool } from "../database/connection"
import { Agendamento, CriarAgendamento, AtualizarAgendamento } from "../types/agendamentos"

class AgendamentoService {
    async getAll(): Promise<Agendamento[]> {
        const res = await pool.query<Agendamento>("SELECT * FROM agendamentos")
        return res.rows
    }

    async getById(id: string): Promise<Agendamento[]> {
        const res = await pool.query<Agendamento>("SELECT * FROM agendamentos WHERE id = $1", [id])
        return res.rows
    }

    async create(dados: CriarAgendamento): Promise<Agendamento> {
        const res = await pool.query<Agendamento>(
            "INSERT INTO agendamentos (cliente_id, barbeiro_id, data, hora, status, valor) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [dados.cliente_id, dados.barbeiro_id, dados.data, dados.hora, dados.status ?? 'AGENDADO', dados.valor ?? 0]
        )
        return res.rows[0]
    }

    async update(id: string, dados: AtualizarAgendamento): Promise<Agendamento | undefined> {
        const campos = (["status","valor"] as const).filter(campo => dados[campo] !== undefined)
        if (!campos.length) throw new Error("Nenhum campo para atualizar")
        const valores: unknown[] = campos.map(campo => dados[campo])
        valores.push(id)
        const res = await pool.query<Agendamento>(
            `UPDATE agendamentos SET ${campos.map((campo, index) => `${campo} = $${index + 1}`).join(", ")} WHERE id = $${valores.length} RETURNING *`,
            valores
        )
        return res.rows[0]
    }
}

export const agendamentoService = new AgendamentoService()

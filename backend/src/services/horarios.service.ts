import { pool } from "../database/connection"
import { Horario, CriarHorario, AtualizarHorario } from "../types/horarios"

class HorarioService {
    async getAll(): Promise<Horario[]> {
        const res = await pool.query<Horario>("SELECT * FROM horarios")
        return res.rows
    }

    async getById(id: string): Promise<Horario[]> {
        const res = await pool.query<Horario>("SELECT * FROM horarios WHERE id = $1", [id])
        return res.rows
    }

    async create(dados: CriarHorario): Promise<Horario> {
        const res = await pool.query<Horario>(
            "INSERT INTO horarios (barbeiro_id, data, hora, disponivel) VALUES ($1, $2, $3, $4) RETURNING *",
            [dados.barbeiro_id, dados.data, dados.hora, dados.disponivel ?? true]
        )
        return res.rows[0]
    }

    async update(id: string, dados: AtualizarHorario): Promise<Horario | undefined> {
        const campos = (["disponivel"] as const).filter(campo => dados[campo] !== undefined)
        if (!campos.length) throw new Error("Nenhum campo para atualizar")
        const valores: unknown[] = campos.map(campo => dados[campo])
        valores.push(id)
        const res = await pool.query<Horario>(
            `UPDATE horarios SET ${campos.map((campo, index) => `${campo} = $${index + 1}`).join(", ")} WHERE id = $${valores.length} RETURNING *`,
            valores
        )
        return res.rows[0]
    }
}

export const horarioService = new HorarioService()

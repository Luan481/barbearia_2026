import { pool } from "../database/connection"
import { Assinatura, CriarAssinatura, AtualizarAssinatura } from "../types/assinaturas"

class AssinaturaService {
    async getAll(): Promise<Assinatura[]> {
        const res = await pool.query<Assinatura>("SELECT * FROM assinaturas")
        return res.rows
    }

    async getById(id: string): Promise<Assinatura[]> {
        const res = await pool.query<Assinatura>("SELECT * FROM assinaturas WHERE id = $1", [id])
        return res.rows
    }

    async create(dados: CriarAssinatura): Promise<Assinatura> {
        const res = await pool.query<Assinatura>(
            "INSERT INTO assinaturas (cliente_id, plano_id, data_inicio, data_fim, cortes_utilizados, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [dados.cliente_id, dados.plano_id, dados.data_inicio, dados.data_fim ?? null, dados.cortes_utilizados ?? 0, dados.status ?? 'ATIVA']
        )
        return res.rows[0]
    }

    async update(id: string, dados: AtualizarAssinatura): Promise<Assinatura | undefined> {
        const campos = (["data_fim","cortes_utilizados","status"] as const).filter(campo => dados[campo] !== undefined)
        if (!campos.length) throw new Error("Nenhum campo para atualizar")
        const valores: unknown[] = campos.map(campo => dados[campo])
        valores.push(id)
        const res = await pool.query<Assinatura>(
            `UPDATE assinaturas SET ${campos.map((campo, index) => `${campo} = $${index + 1}`).join(", ")} WHERE id = $${valores.length} RETURNING *`,
            valores
        )
        return res.rows[0]
    }
}

export const assinaturaService = new AssinaturaService()

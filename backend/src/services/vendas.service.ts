import { pool } from "../database/connection"
import { Venda, CriarVenda, AtualizarVenda } from "../types/vendas"

class VendaService {
    async getAll(): Promise<Venda[]> {
        const res = await pool.query<Venda>("SELECT * FROM vendas")
        return res.rows
    }

    async getById(id: string): Promise<Venda[]> {
        const res = await pool.query<Venda>("SELECT * FROM vendas WHERE id = $1", [id])
        return res.rows
    }

    async create(dados: CriarVenda): Promise<Venda> {
        const res = await pool.query<Venda>(
            "INSERT INTO vendas (cliente_id, data, valor_total, forma_pagamento) VALUES ($1, COALESCE($2::timestamp, CURRENT_TIMESTAMP), $3, $4) RETURNING *",
            [dados.cliente_id ?? null, dados.data ?? null, dados.valor_total ?? 0, dados.forma_pagamento ?? null]
        )
        return res.rows[0]
    }

    async update(id: string, dados: AtualizarVenda): Promise<Venda | undefined> {
        const campos = (["valor_total","forma_pagamento"] as const).filter(campo => dados[campo] !== undefined)
        if (!campos.length) throw new Error("Nenhum campo para atualizar")
        const valores: unknown[] = campos.map(campo => dados[campo])
        valores.push(id)
        const res = await pool.query<Venda>(
            `UPDATE vendas SET ${campos.map((campo, index) => `${campo} = $${index + 1}`).join(", ")} WHERE id = $${valores.length} RETURNING *`,
            valores
        )
        return res.rows[0]
    }
}

export const vendaService = new VendaService()

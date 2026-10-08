import { pool } from "../database/connection"
import { VendaItem, CriarVendaItem } from "../types/venda_itens"

class VendaItemService {
    async getAll(): Promise<VendaItem[]> {
        const res = await pool.query<VendaItem>("SELECT * FROM venda_itens")
        return res.rows
    }

    async getById(id: string): Promise<VendaItem[]> {
        const res = await pool.query<VendaItem>("SELECT * FROM venda_itens WHERE id = $1", [id])
        return res.rows
    }

    async create(dados: CriarVendaItem): Promise<VendaItem> {
        const res = await pool.query<VendaItem>(
            "INSERT INTO venda_itens (venda_id, produto_id, quantidade, preco) VALUES ($1, $2, $3, $4) RETURNING *",
            [dados.venda_id, dados.produto_id, dados.quantidade, dados.preco]
        )
        return res.rows[0]
    }
}

export const vendaItemService = new VendaItemService()

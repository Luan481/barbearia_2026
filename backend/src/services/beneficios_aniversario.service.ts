import { pool } from "../database/connection"
import { BeneficioAniversario, CriarBeneficioAniversario, AtualizarBeneficioAniversario } from "../types/beneficios_aniversario"

class BeneficioAniversarioService {
    async getAll(): Promise<BeneficioAniversario[]> {
        const res = await pool.query<BeneficioAniversario>("SELECT * FROM beneficios_aniversario")
        return res.rows
    }

    async getById(id: string): Promise<BeneficioAniversario[]> {
        const res = await pool.query<BeneficioAniversario>("SELECT * FROM beneficios_aniversario WHERE id = $1", [id])
        return res.rows
    }

    async create(dados: CriarBeneficioAniversario): Promise<BeneficioAniversario> {
        const res = await pool.query<BeneficioAniversario>(
            "INSERT INTO beneficios_aniversario (cliente_id, ano, utilizado) VALUES ($1, $2, $3) RETURNING *",
            [dados.cliente_id, dados.ano, dados.utilizado ?? false]
        )
        return res.rows[0]
    }

    async update(id: string, dados: AtualizarBeneficioAniversario): Promise<BeneficioAniversario | undefined> {
        const campos = (["utilizado"] as const).filter(campo => dados[campo] !== undefined)
        if (!campos.length) throw new Error("Nenhum campo para atualizar")
        const valores: unknown[] = campos.map(campo => dados[campo])
        valores.push(id)
        const res = await pool.query<BeneficioAniversario>(
            `UPDATE beneficios_aniversario SET ${campos.map((campo, index) => `${campo} = $${index + 1}`).join(", ")} WHERE id = $${valores.length} RETURNING *`,
            valores
        )
        return res.rows[0]
    }
}

export const beneficioAniversarioService = new BeneficioAniversarioService()

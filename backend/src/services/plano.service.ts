import { pool } from "../database/connection"
import { CriarPlano, Plano } from "../types/planos"

class PlanoService {
        async getAll(): Promise<Plano[]> {
            try {
                const res = await pool.query<Plano>(`SELECT * FROM planos`)

                return res.rows
            }
            catch (error) {
                console.error('Erro ao visualizar planos', error)
                throw error
            }
        }
        async create(dados: CriarPlano): Promise<Plano> {
            try {
                const res = await pool.query<Plano>(`INSERT INTO planos(nome, quantidade_cortes, preco, ativo) VALUES ($1, $2, $3, $4) RETURNING *`, [dados.nome, dados.quantidade_cortes, dados.preco, dados.ativo ?? true])

                return res.rows[0]
            }
            catch (error) {
                console.error('Erro ao criar plano', error)
                throw error
            }
        }

        async getById(id: string): Promise<Plano[]> {
            try {

                const res = await pool.query<Plano>("SELECT * FROM planos WHERE id = $1", [id]);

                return res.rows;

            } catch (error) {
                console.error("Erro ao buscar planos:", error);
                throw error;
            }
        }

        async inativar(id: string): Promise<Plano> {
            try {
                const res = await pool.query<Plano>(`
                    UPDATE planos
                    SET ativo = false
                    WHERE id = $1 RETURNING *
                    `, [id])

                const resultado = res.rows[0]

                console.log(`Plano inativado`)

                return resultado
            }

            catch (error) {
                console.error('Erro ao inativar plano:', error)
                throw error
            }
        }

        async ativar(id: string): Promise<Plano> {
            try {
                const res = await pool.query<Plano>(`
                    UPDATE planos
                    SET ativo = true
                    WHERE id = $1 RETURNING *
                    `, [id])

                const resultado = res.rows[0]

                console.log(`Plano ativado`)

                return resultado
            }

            catch (error) {
                console.error('Erro ao ativar plano:', error)
                throw error
            }
        }
}

export const planoService = new PlanoService

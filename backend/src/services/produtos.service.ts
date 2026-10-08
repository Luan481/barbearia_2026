import console from "node:console";
import { pool } from "../database/connection";
import { CriarProdutos, Produtos } from "../types/produtos";

class ProdutosService {
    async getAll(): Promise<Produtos[]> {
        try {
            const res = await pool.query<Produtos>(`SELECT * FROM produtos`)

            return res.rows
        }
        catch (error) {
            console.error('Erro ao visualizar produtos', error)
            throw error
        }
    }
    async create(dados: CriarProdutos): Promise<Produtos> {
        try {
            const res = await pool.query<Produtos>(`INSERT INTO produtos(nome, preco, estoque, ativo) VALUES ($1, $2, $3, $4) RETURNING *`, [dados.nome, dados.preco, dados.estoque ?? 0, dados.ativo ?? true])

            return res.rows[0]
        }
        catch (error) {
            console.error('Erro ao criar produto', error)
            throw error
        }
    }

    async getById(id: string): Promise<Produtos[]> {
        try {

            const res = await pool.query<Produtos>("SELECT * FROM produtos WHERE id = $1", [id]);

            return res.rows;

        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw error;
        }
    }

    async inativar(id: string): Promise<Produtos> {
        try {
            const res = await pool.query<Produtos>(`
                UPDATE produtos
                SET ativo = false
                WHERE id = $1 RETURNING *
                `, [id])

            const resultado = res.rows[0]

            console.log(`Produto inativado`)

            return resultado
        }

        catch (error) {
            console.error('Erro ao inativar produto:', error)
            throw error
        }
    }

    async ativar(id: string): Promise<Produtos> {
        try {
            const res = await pool.query<Produtos>(`
                UPDATE produtos
                SET ativo = true
                WHERE id = $1 RETURNING *
                `, [id])

            const resultado = res.rows[0]

            console.log(`Produto ativado`)

            return resultado
        }

        catch (error) {
            console.error('Erro ao ativar produto:', error)
            throw error
        }
    }
}

export const produtosService = new ProdutosService

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
            throw new Error('Erro no banco de dados')
        }
    }
    async create(dados: CriarProdutos): Promise<Produtos> {
        try {
            const res = await pool.query<Produtos>(`INSERT INTO produtos(nome, preco, estoque) VALUES ($1, $2, $3) RETURNING *`, [dados.nome, dados.preco, dados.estoque])

            return res.rows[0]
        }
        catch (error) {
            console.error('Erro ao criar produto', error)
            throw new Error('Erro no banco de dados')
        }
    }

    async getById(id: String): Promise<Produtos[]> {
        try {

            const res = await pool.query<Produtos>("SELECT * FROM produtos WHERE id = $1", [id]);

            return res.rows;

        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw new Error("Erro no banco de dados");
        }
    }

    async inativar(id: String): Promise<Produtos> {
        try {
            const res = await pool.query<Produtos>(`
                UPDATE produtos 
                SET ativo = false 
                WHERE id = $1 
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

    async ativar(id: String): Promise<Produtos> {
        try {
            const res = await pool.query<Produtos>(`
                UPDATE produtos 
                SET ativo = true 
                WHERE id = $1 
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
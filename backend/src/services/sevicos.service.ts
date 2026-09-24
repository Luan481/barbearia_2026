import { Request, Response } from "express";
import { pool } from "../database/connection";
import { CriarServico, Servico } from "../types/servicos";

class ServicoService {
    async getAll(): Promise<Servico[]> {
        try {
            const res = await pool.query<Servico>(`SELECT * FROM servico RETURNING *`)

            return res.rows
        }

        catch (error) {
            console.error('Erro ao consultar serviços', error)
            throw new Error('Erro no banco de dados')
        }
    }

    async create(dados: CriarServico): Promise<Servico> {
        try {
            const res = await pool.query<Servico>(`INSERT INTO servico(nome, descricao, duracao, preco) VALUES ($1, $2, $3, $4) RETURNING *`, [dados.nome, dados.descricao, dados.duracao, dados.preco])

            return res.rows[0]
        }
        catch (error) {
            console.error('Erro ao criar serviço', error)
            throw new Error('Erro no banco de dados')
        }
    }

    async getById(id: String): Promise<Servico[]> {
        try {

            const res = await pool.query<Servico>("SELECT * FROM servico WHERE id = $1", [id]);

            return res.rows;

        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
            throw new Error("Erro no banco de dados");
        }
    }
}

export const servicoService = new ServicoService
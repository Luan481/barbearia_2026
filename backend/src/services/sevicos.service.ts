import { Request, Response } from "express";
import { pool } from "../database/connection";
import { CriarServico, Servico } from "../types/servicos";

class ServicoService {
    async getAll(): Promise<Servico[]> {
        try {
            const res = await pool.query<Servico>(`SELECT * FROM servicos`)

            return res.rows
        }

        catch (error) {
            console.error('Erro ao consultar serviços', error)
            throw error
        }
    }

    async create(dados: CriarServico): Promise<Servico> {
        try {
            const res = await pool.query<Servico>(`INSERT INTO servicos(nome, descricao, duracao, preco, ativo) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [dados.nome, dados.descricao ?? null, dados.duracao, dados.preco, dados.ativo ?? true])

            return res.rows[0]
        }
        catch (error) {
            console.error('Erro ao criar serviço', error)
            throw error
        }
    }

    async getById(id: string): Promise<Servico[]> {
        try {

            const res = await pool.query<Servico>("SELECT * FROM servicos WHERE id = $1", [id]);

            return res.rows;

        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
            throw error;
        }
    }
    async ativar(id: string): Promise<Servico | undefined> {
        const res = await pool.query<Servico>("UPDATE servicos SET ativo = true WHERE id = $1 RETURNING *", [id])
        return res.rows[0]
    }

    async inativar(id: string): Promise<Servico | undefined> {
        const res = await pool.query<Servico>("UPDATE servicos SET ativo = false WHERE id = $1 RETURNING *", [id])
        return res.rows[0]
    }


}

export const servicoService = new ServicoService

import { pool } from "../database/connection.js";
import bcrypt from "bcrypt"
import { CriarUser, User } from "../types/usuarios.js"

const saltRounds = Number(process.env.BCRYPT_SALTS)

class UserService {
    async create(dados: CriarUser): Promise<User> {

        if (!saltRounds) {
            throw new Error('Configuração bcrypt mal feita')
        }

        const senhaHash = await bcrypt.hash(dados.senha, saltRounds);


        try {
            const res = await pool.query<User>(
                `INSERT INTO usuarios (nome, email, senha, telefone, data_nascimento, tipo, ativo)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`,
                [dados.nome, dados.email, senhaHash, dados.telefone ?? null, dados.data_nascimento ?? dados.nascimento ?? null, dados.tipo ?? "CLIENTE", dados.ativo ?? true]
            );

            const cliente = res.rows[0];

            return cliente

        } catch (error) {
            console.error("Erro ao criar usuario:", error);
            throw error;
        }
    }


    async getAll(): Promise<User[]> {
        try {

            const res = await pool.query<User>("SELECT * FROM usuarios");

            return res.rows;

        } catch (error) {
            console.error("Erro ao buscar usuarios:", error);
            throw error;
        }
    }

    async getById(id: string): Promise<User[]> {
        try {

            const res = await pool.query<User>("SELECT * FROM usuarios WHERE id = $1", [id]);

            return res.rows;

        } catch (error) {
            console.error("Erro ao buscar usuarios:", error);
            throw error;
        }
    }

    async inativar(id: string): Promise<User> {
        try {
            const res = await pool.query<User>(`
                UPDATE usuarios
                SET ativo = false
                WHERE id = $1 RETURNING *
                `, [id])

            const resultado = res.rows[0]

            console.log(`Usuário inativado`)

            return resultado
        }

        catch (error) {
            console.error('Erro ao inativar usuário:', error)
            throw error
        }
    }

    async ativar(id: string): Promise<User> {
        try {
            const res = await pool.query<User>(`
                UPDATE usuarios
                SET ativo = true
                WHERE id = $1 RETURNING *
                `, [id])

            const resultado = res.rows[0]

            console.log(`Usuário ativado`)

            return resultado
        }

        catch (error) {
            console.error('Erro ao ativar usuário:', error)
            throw error
        }
    }
}
export const userService = new UserService

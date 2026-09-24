import { pool } from "../database/connection.js";
import { CriarUser, User } from "../types/usuarios.js"

class UserService {
    async create(dados: CriarUser): Promise<User> {
        try {
            const res = await pool.query<User>(
                `INSERT INTO usuario (nome, email, senha, telefone, data_nascimento, tipo, ativo)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`,
                [dados.nome, dados.email, dados.senha, dados.telefone, dados.nascimento, dados.tipo, dados.ativo]
            );

            const cliente = res.rows[0];

            return cliente

        } catch (error) {
            console.error("Erro ao criar usuario:", error);
            throw new Error("Erro no banco de dados");
        }
    }


    async getAll(): Promise<User[]> {
        try {

            const res = await pool.query<User>("SELECT * FROM usuario");

            return res.rows;

        } catch (error) {
            console.error("Erro ao buscar usuarios:", error);
            throw new Error("Erro no banco de dados");
        }
    }

    async getById(id: String): Promise<User[]> {
        try {

            const res = await pool.query<User>("SELECT * FROM usuario WHERE id = $1", [id]);

            return res.rows;

        } catch (error) {
            console.error("Erro ao buscar usuarios:", error);
            throw new Error("Erro no banco de dados");
        }
    }

    async inativar(id: String): Promise<User> {
        try {
            const res = await pool.query<User>(`
                UPDATE usuario 
                SET ativo = false 
                WHERE id = $1 
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

        async ativar(id: String): Promise<User> {
        try {
            const res = await pool.query<User>(`
                UPDATE usuario
                SET ativo = true 
                WHERE id = $1 
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
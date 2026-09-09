import { pool } from "../database/connection.js";
import { CriarUser, User } from "../types/usuarios.js"

class UserService {
    async create(dados: CriarUser): Promise<User>{
        try {
            const res = await pool.query<User>(
                `INSERT INTO usuarios (nome, email, senha, telefone, data_nascimento, tipo, ativo)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`,
                [dados.nome, dados.email, dados.senha, dados.telefone, dados.nascimento, dados.tipo, dados.ativo]
            );

            const cliente = res.rows[0];

            return cliente

        } catch (error) {
            console.error("Erro ao criar usuarios:", error);
            throw new Error("Erro no banco de dados");
        }
    }


    async getAll(): Promise<User[]> {
        try {

            const res = await pool.query<User>("SELECT * FROM usuarios");
            console.log(res.rows)

            return res.rows;

        } catch (error) {
            console.error("Erro ao buscar usuarios:", error);
            throw new Error("Erro no banco de dados");
        }
    }

}

export const userService = new UserService
import { pool } from '../database/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Login, LoginData, LoginResponse } from '../types/auth.js'

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET não configurado.');
    }

    return secret;
}

export class AuthService {
    async login(dados: LoginData): Promise<LoginResponse> {
        const query = 'SELECT * FROM funcionario WHERE email = $1';

        const result = await pool.query<Login>(query, [dados.email]);
        const funcionario = result.rows[0];

        if (!funcionario) {
            throw new Error('E-mail ou senha incorretos.');
        }

        const senhaValida = await bcrypt.compare(
            dados.senha,
            funcionario.senha
        );

        if (!senhaValida) {
            throw new Error('E-mail ou senha incorretos.');
        }

        const secret = getJwtSecret();

        const token = jwt.sign(
            {
                id: funcionario.id,
                nome: funcionario.nome,
                tipo: funcionario.tipo,
            },
            secret,
            {
                expiresIn: '8h',
            }
        );

        return {
            nome: funcionario.nome,
            email: funcionario.email,
            tipo: funcionario.tipo,
            token,
        };
    }
}
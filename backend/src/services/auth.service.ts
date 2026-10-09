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
        const query = 'SELECT * FROM usuarios WHERE email = $1';

        const result = await pool.query<Login>(query, [dados.email]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('E-mail ou senha incorretos.');
        }

        const senhaValida = await bcrypt.compare(
            dados.senha,
            user.senha
        );

        if (!senhaValida) {
            throw new Error('E-mail ou senha incorretos.');
        }

        const secret = getJwtSecret();

        const token = jwt.sign(
            {
                id: user.id,
                nome: user.nome,
                tipo: user.tipo,
            },
            secret,
            {
                expiresIn: '8h',
            }
        );

        return {
            nome: user.nome,
            email: user.email,
            tipo: user.tipo,
            token,
        };
    }
}
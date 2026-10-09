import { Router, Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

const authRoutes = Router();
const authService = new AuthService();

authRoutes.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                error: 'E-mail e senha são obrigatórios.',
            });
        }

        const dadosAuth = await authService.login({
            email,
            senha,
        });

        return res.status(200).json(dadosAuth);
    } catch (error: any) {
        return res.status(401).json({
            error: error.message,
        });
    }
});

export { authRoutes };
export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface Session {
  nome: string;
  email: string;
  tipo: string;
  token: string;
}

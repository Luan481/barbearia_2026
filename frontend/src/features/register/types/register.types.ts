export interface RegisterCredentials {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  tipo?: string;
}

export interface UserResponse {
  id?: string;
  nome: string;
  email: string;
  tipo?: string;
}

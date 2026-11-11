import { useState } from "react";
import { Link } from "react-router-dom";
import type { FormEvent } from "react";
import { Flame, Eye, EyeOff } from "lucide-react";
import { isAxiosError } from "axios";

import { useRegister } from "../hooks/use-register";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: register, isPending, error } = useRegister();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    register({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim() || undefined,
      senha,
      tipo: "cliente",
    });
  }

  const errorMessage = isAxiosError<{ error?: string; message?: string }>(error)
    ? error.response?.data?.error ?? error.response?.data?.message ?? "Não foi possível criar a conta. Tente novamente."
    : error ? "Não foi possível criar a conta. Tente novamente." : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 bg-[#f5f2ec] text-[#302a25]">
      {/* Brand Header */}
      <div className="flex items-center gap-2">
        <Flame size={28} className="text-[#ce6a43]" aria-hidden="true" />
        <span className="text-2xl font-black tracking-tight text-[#302a25]">
          forja<span className="text-[#ce6a43]">.</span>
        </span>
        <span className="ml-1 border-l border-[#ded8cf] pl-3 text-[11px] font-bold tracking-[0.18em] uppercase text-[#6e675f]">
          Barbearia
        </span>
      </div>

      {/* Headings */}
      <div className="text-center mt-10">
        <h1 className="text-3xl font-extrabold text-[#302a25] mb-2 tracking-tight">
          Criar sua conta
        </h1>
        <p className="text-[#6e675f] text-sm mb-8">
          Agende cortes e barbas com os melhores profissionais
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="nome"
            className="block text-[#302a25] mb-1 font-semibold text-sm"
          >
            Nome completo
          </label>
          <input
            id="nome"
            autoComplete="name"
            type="text"
            required
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Ex: Carlos Silva"
            className="bg-white/80 backdrop-blur-xs border border-[#ded8cf] rounded-xl px-4 py-3 text-sm font-medium text-[#302a25] placeholder:text-[#a8a29e] focus:border-[#ce6a43] focus:ring-2 focus:ring-[#ce6a43]/20 focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="block text-[#302a25] mb-1 font-semibold text-sm"
          >
            E-mail
          </label>
          <input
            id="email"
            autoComplete="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="voce@email.com"
            className="bg-white/80 backdrop-blur-xs border border-[#ded8cf] rounded-xl px-4 py-3 text-sm font-medium text-[#302a25] placeholder:text-[#a8a29e] focus:border-[#ce6a43] focus:ring-2 focus:ring-[#ce6a43]/20 focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="telefone"
            className="block text-[#302a25] mb-1 font-semibold text-sm"
          >
            Telefone / WhatsApp (opcional)
          </label>
          <input
            id="telefone"
            autoComplete="tel"
            type="tel"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            placeholder="(11) 99999-9999"
            className="bg-white/80 backdrop-blur-xs border border-[#ded8cf] rounded-xl px-4 py-3 text-sm font-medium text-[#302a25] placeholder:text-[#a8a29e] focus:border-[#ce6a43] focus:ring-2 focus:ring-[#ce6a43]/20 focus:outline-none transition-all"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="senha"
            className="block text-[#302a25] mb-1 font-semibold text-sm"
          >
            Senha
          </label>
          <div className="relative">
            <input
              id="senha"
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              required
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Crie uma senha segura"
              className="bg-white/80 backdrop-blur-xs border border-[#ded8cf] rounded-xl px-4 py-3 pr-11 text-sm font-medium text-[#302a25] placeholder:text-[#a8a29e] focus:border-[#ce6a43] focus:ring-2 focus:ring-[#ce6a43]/20 focus:outline-none transition-all w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e675f] hover:text-[#302a25] transition-colors p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-[#302a25] mt-4 text-white cursor-pointer shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1f1b18] hover:shadow-lg font-semibold rounded-full py-3.5 w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {/* Footer Link */}
      <div className="flex items-center gap-1.5 mt-8 text-sm">
        <span className="text-[#6e675f]">Já tem uma conta?</span>
        <Link
          to="/login"
          className="text-[#ce6a43] hover:text-[#a94827] font-semibold underline underline-offset-4"
        >
          Entrar
        </Link>
      </div>
    </div>
  );
}

import { Flame, LogOut, Calendar, Clock, Scissors, UserCheck } from "lucide-react";
import { useAuth } from "../../auth";

export default function DashboardPage() {
  const { session, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#302a25] flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-[#ded8cf] bg-[#f5f2ec]/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame size={24} className="text-[#ce6a43]" aria-hidden="true" />
            <span className="text-xl font-black tracking-tight text-[#302a25]">
              forja<span className="text-[#ce6a43]">.</span>
            </span>
            <span className="ml-1 border-l border-[#ded8cf] pl-2.5 text-[10px] font-bold tracking-[0.16em] uppercase text-[#6e675f]">
              Barbearia
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-bold text-[#302a25]">
                {session?.nome ?? "Usuário"}
              </span>
              <span className="text-xs text-[#6e675f]">
                {session?.email}
              </span>
            </div>

            <button
              onClick={signOut}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-[#ded8cf] hover:border-[#302a25] hover:bg-[#302a25] hover:text-white transition-all duration-200"
              title="Encerrar sessão"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        {/* Welcome Banner */}
        <section className="bg-white rounded-3xl p-8 border border-[#ded8cf] shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f2ec] text-xs font-semibold text-[#ce6a43] mb-3">
                <UserCheck size={14} />
                <span>Perfil: {session?.tipo ?? "Cliente"}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#302a25] tracking-tight">
                Olá, {session?.nome ? session.nome.split(" ")[0] : "Cliente"}! 👋
              </h1>
              <p className="text-[#6e675f] text-sm mt-1">
                Bem-vindo ao painel da Forja Barbearia. Gerencie seus cortes e agendamentos.
              </p>
            </div>

            <button className="inline-flex items-center justify-center gap-2 bg-[#ce6a43] hover:bg-[#a94827] text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow">
              <Calendar size={16} />
              <span>Novo Agendamento</span>
            </button>
          </div>
        </section>

        {/* Quick Action Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#ded8cf] hover:border-[#ce6a43] transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#f5f2ec] flex items-center justify-center text-[#ce6a43] mb-4">
              <Scissors size={24} />
            </div>
            <h3 className="font-bold text-lg text-[#302a25] mb-1">Serviços & Barba</h3>
            <p className="text-sm text-[#6e675f]">
              Conheça a lista completa de cortes, barba na toalha quente e combos exclusivos.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#ded8cf] hover:border-[#ce6a43] transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#f5f2ec] flex items-center justify-center text-[#ce6a43] mb-4">
              <Clock size={24} />
            </div>
            <h3 className="font-bold text-lg text-[#302a25] mb-1">Meus Horários</h3>
            <p className="text-sm text-[#6e675f]">
              Consulte seu histórico e próximos horários agendados com nossos barbeiros.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#ded8cf] hover:border-[#ce6a43] transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#f5f2ec] flex items-center justify-center text-[#ce6a43] mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="font-bold text-lg text-[#302a25] mb-1">Clube de Assinatura</h3>
            <p className="text-sm text-[#6e675f]">
              Faça parte do clube Forja e tenha cortes ilimitados com descontos especiais.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#ded8cf] py-6 text-center text-xs text-[#6e675f]">
        © 2026 Forja Barbearia. Todos os direitos reservados.
      </footer>
    </div>
  );
}

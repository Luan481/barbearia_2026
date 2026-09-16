import { useState } from "react";
import { Scissors, MapPin, Clock, Menu, X, Flame } from "lucide-react";

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

  .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
  .font-body { font-family: 'IBM Plex Sans', sans-serif; }
  .font-mono { font-family: 'IBM Plex Mono', monospace; }

  @keyframes ember-rise {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 0.9; }
    100% { transform: translateY(-140px) translateX(var(--drift, 12px)); opacity: 0; }
  }
  .ember {
    position: absolute;
    bottom: 0;
    width: 3px;
    height: 3px;
    border-radius: 999px;
    background: #C17A34;
    box-shadow: 0 0 6px 1px rgba(193,122,52,0.8);
    animation: ember-rise linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .ember { animation: none; opacity: 0; }
  }
`;

const EMBERS = [
  { left: "8%", delay: "0s", duration: "5.5s", drift: "18px" },
  { left: "22%", delay: "1.2s", duration: "6.2s", drift: "-14px" },
  { left: "38%", delay: "0.4s", duration: "4.8s", drift: "10px" },
  { left: "55%", delay: "2.1s", duration: "6.8s", drift: "-20px" },
  { left: "71%", delay: "0.9s", duration: "5.1s", drift: "16px" },
  { left: "86%", delay: "1.7s", duration: "5.9s", drift: "-10px" },
  { left: "94%", delay: "3s", duration: "6.5s", drift: "14px" },
];

const SERVICOS = [
  { nome: "Corte clássico", desc: "Tesoura e máquina, acabamento na navalha.", preco: "60" },
  { nome: "Barba completa", desc: "Toalha quente, óleo e navalha.", preco: "45" },
  { nome: "Corte + barba", desc: "O combo completo, sem pressa.", preco: "95" },
  { nome: "Acabamento", desc: "Ajuste de contorno entre cortes.", preco: "25" },
  { nome: "Sobrancelha", desc: "Alinhamento na navalha.", preco: "20" },
  { nome: "Coloração", desc: "Cobertura de grisalhos, tom natural.", preco: "70" },
];

const EQUIPE = [
  { nome: "Diego Ferreira", especialidade: "Cortes clássicos e degradê", iniciais: "DF" },
  { nome: "Rafael Souza", especialidade: "Especialista em barba", iniciais: "RS" },
  { nome: "Bruno Lima", especialidade: "Navalha e acabamentos", iniciais: "BL" },
];

const PASSOS = [
  { numero: "01", titulo: "Escolha o serviço", texto: "Veja o que você precisa e o preço, sem letra miúda." },
  { numero: "02", titulo: "Escolha barbeiro e horário", texto: "Marque com quem você confia, no dia que funciona pra você." },
  { numero: "03", titulo: "Chegue e aproveite", texto: "O resto é com a gente. Café coado incluso." },
];

const DEPOIMENTOS = [
  { texto: "Saí de lá outro homem. Atenção a cada detalhe, do início ao fim.", nome: "Marcos T." },
  { texto: "Ambiente sem frescura, resultado impecável. Virei cliente fixo.", nome: "Felipe A." },
  { texto: "A barba nunca ficou tão bem alinhada. Vale cada minuto de espera.", nome: "Igor P." },
];

const HORARIOS = [
  { dia: "Segunda a sexta", hora: "9h – 20h" },
  { dia: "Sábado", hora: "9h – 18h" },
  { dia: "Domingo", hora: "Fechado" },
];

function Logo({ className = "" }) {
  return (
    <span className={`font-display text-2xl tracking-wide flex items-center gap-2 ${className}`}>
      <Flame className="w-5 h-5 text-[#C17A34]" strokeWidth={2} />
      FORJA
    </span>
  );
}

export default function ForjaBarbearia() {
  const [menuAberto, setMenuAberto] = useState(false);

  const navLinks = [
    { label: "Serviços", href: "#servicos" },
    { label: "Equipe", href: "#equipe" },
    { label: "Localização", href: "#localizacao" },
  ];

  return (
    <div className="font-body bg-[#1A1817] text-[#E8E2D8] min-h-screen">
      <style>{FONT_STYLES}</style>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1817]/95 backdrop-blur border-b border-[#4A4744]/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-[#C4BFB6] hover:text-[#E8E2D8] transition-colors">
                {l.label}
              </a>
            ))}
            <a
              href="#agendar"
              className="bg-[#C17A34] text-[#1A1817] text-sm font-semibold px-5 py-2 rounded-sm hover:bg-[#D68B41] transition-colors"
            >
              Agendar horário
            </a>
          </nav>
          <button
            className="md:hidden text-[#E8E2D8]"
            onClick={() => setMenuAberto((v) => !v)}
            aria-label="Abrir menu"
          >
            {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuAberto && (
          <div className="md:hidden border-t border-[#4A4744]/40 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-[#C4BFB6]" onClick={() => setMenuAberto(false)}>
                {l.label}
              </a>
            ))}
            <a
              href="#agendar"
              className="bg-[#C17A34] text-[#1A1817] text-sm font-semibold px-5 py-2 rounded-sm text-center"
              onClick={() => setMenuAberto(false)}
            >
              Agendar horário
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #8B8680 0px, #8B8680 1px, transparent 1px, transparent 14px)",
          }}
        />
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember"
            style={{ left: e.left, animationDelay: e.delay, animationDuration: e.duration, "--drift": e.drift }}
          />
        ))}

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-40 md:pt-32 md:pb-52">
          <p className="text-[#C17A34] font-mono text-xs mb-6">Barbearia · Centro</p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] max-w-3xl">
            Corte com precisão de oficina.
          </h1>
          <p className="mt-6 max-w-md text-[#C4BFB6] text-base leading-relaxed">
            Cada corte é feito à mão, com ferramenta afiada e atenção total.
            Sem pressa, sem atalho — só o trabalho bem feito.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#agendar"
              className="bg-[#C17A34] text-[#1A1817] font-semibold px-7 py-3 rounded-sm hover:bg-[#D68B41] transition-colors"
            >
              Agendar horário
            </a>
            <a href="#servicos" className="text-[#E8E2D8] text-sm border-b border-[#8B8680] pb-0.5 hover:border-[#C17A34] transition-colors">
              Ver serviços e preços
            </a>
          </div>
        </div>

        {/* corte diagonal */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-[#242220]"
          style={{ clipPath: "polygon(0 100%, 100% 40%, 100% 100%)" }}
        />
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="bg-[#242220] border-t border-[#4A4744]/40">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
            <h2 className="font-display text-4xl md:text-5xl">Serviços</h2>
            <p className="text-[#8B8680] text-sm max-w-xs">Preços fixos. Sem surpresa na hora de pagar.</p>
          </div>

          <div className="divide-y divide-[#4A4744]/40 border-t border-b border-[#4A4744]/40">
            {SERVICOS.map((s) => (
              <div key={s.nome} className="flex items-center justify-between py-6 gap-6">
                <div>
                  <h3 className="font-body font-semibold text-lg">{s.nome}</h3>
                  <p className="text-[#8B8680] text-sm mt-1">{s.desc}</p>
                </div>
                <span className="font-mono text-xl text-[#C17A34] whitespace-nowrap">R$ {s.preco}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-[#1A1817]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="font-display text-4xl md:text-5xl mb-14">Como funciona</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {PASSOS.map((p) => (
              <div key={p.numero} className="border-l-2 border-[#C17A34] pl-5">
                <span className="font-mono text-sm text-[#8B8680]">{p.numero}</span>
                <h3 className="font-body font-semibold text-lg mt-2">{p.titulo}</h3>
                <p className="text-[#8B8680] text-sm mt-2 leading-relaxed">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPE */}
      <section id="equipe" className="bg-[#242220] border-y border-[#4A4744]/40">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="font-display text-4xl md:text-5xl mb-14">Quem corta</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {EQUIPE.map((b) => (
              <div key={b.nome}>
                <div className="w-full aspect-square bg-[#1A1817] border border-[#4A4744]/60 flex items-center justify-center">
                  <span className="font-display text-5xl text-[#4A4744]">{b.iniciais}</span>
                </div>
                <h3 className="font-body font-semibold mt-4">{b.nome}</h3>
                <p className="text-[#8B8680] text-sm mt-1">{b.especialidade}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-[#1A1817]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="font-display text-4xl md:text-5xl mb-14">Quem já passou por aqui</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {DEPOIMENTOS.map((d) => (
              <div key={d.nome} className="flex flex-col gap-4">
                <Scissors className="w-4 h-4 text-[#C17A34]" />
                <p className="text-[#E8E2D8] text-base leading-relaxed">"{d.texto}"</p>
                <span className="text-[#8B8680] text-sm">{d.nome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO / AGENDAR */}
      <section id="localizacao" className="bg-[#242220] border-t border-[#4A4744]/40">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14">
          <div>
            <h2 className="font-display text-4xl md:text-5xl mb-8">Onde estamos</h2>
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-5 h-5 text-[#C17A34] mt-0.5 shrink-0" />
              <p className="text-[#C4BFB6]">Rua das Oficinas, 245 — Centro</p>
            </div>
            <div className="flex items-start gap-3 mb-8">
              <Clock className="w-5 h-5 text-[#C17A34] mt-0.5 shrink-0" />
              <div className="flex flex-col gap-1">
                {HORARIOS.map((h) => (
                  <div key={h.dia} className="flex gap-4 text-[#C4BFB6] text-sm">
                    <span className="w-32">{h.dia}</span>
                    <span className="text-[#8B8680]">{h.hora}</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              id="agendar"
              href="#"
              className="inline-block bg-[#C17A34] text-[#1A1817] font-semibold px-7 py-3 rounded-sm hover:bg-[#D68B41] transition-colors"
            >
              Agendar horário
            </a>
          </div>
          <div
            className="w-full h-64 md:h-full bg-[#1A1817] border border-[#4A4744]/60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #4A4744 0px, #4A4744 1px, transparent 1px, transparent 24px), repeating-linear-gradient(0deg, #4A4744 0px, #4A4744 1px, transparent 1px, transparent 24px)",
            }}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1817] border-t border-[#4A4744]/40">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo className="text-lg" />
          <p className="text-[#8B8680] text-sm">© {new Date().getFullYear()} Forja Barbearia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
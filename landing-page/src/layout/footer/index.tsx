import Logo from '../../components/Logo'

export default function Footer() {
  return (
    <footer className="bg-[#302a25] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-7">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#d3c8bc]">Corte, barba e cuidado de verdade. Feito à mão, com atenção em cada detalhe.</p>
          </div>
          <nav aria-label="Navegação do rodapé">
            <h2 className="mb-4 text-xs font-semibold tracking-widest uppercase">A barbearia</h2>
            <ul className="space-y-3 text-sm text-[#d3c8bc]">
              <li><a href="#inicio" className="hover:text-white">Início</a></li>
              <li><a href="#servicos" className="hover:text-white">Serviços e preços</a></li>
              <li><a href="#equipe" className="hover:text-white">Nossa equipe</a></li>
            </ul>
          </nav>
          <div>
            <h2 className="mb-4 text-xs font-semibold tracking-widest uppercase">Visite a Forja</h2>
            <p className="text-sm leading-relaxed text-[#d3c8bc]">Rua das Oficinas, 245<br />Centro</p>
            <a href="#agendar" className="mt-3 inline-block text-sm text-[#e69b78] hover:underline">Ver horários de atendimento</a>
          </div>
        </div>
        <p className="border-t border-white/15 pt-6 text-xs leading-relaxed text-[#d3c8bc]">© {new Date().getFullYear()} Forja Barbearia. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

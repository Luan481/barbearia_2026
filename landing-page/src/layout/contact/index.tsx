import { Clock, MapPin, Coffee } from 'lucide-react'

const horarios = [
  { dia: 'Segunda a sexta', hora: '9h – 20h' },
  { dia: 'Sábado', hora: '9h – 18h' },
  { dia: 'Domingo', hora: 'Fechado' },
]

const passos = [
  { titulo: 'Escolha o serviço', texto: 'Veja o que você precisa e o preço, sem letra miúda.' },
  { titulo: 'Escolha barbeiro e horário', texto: 'Combine seu atendimento com a equipe no dia que funciona pra você.' },
  { titulo: 'Chegue e aproveite', texto: 'O resto é com a gente. Café coado incluso.' },
]

export default function Contact() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-6 pt-16 pb-24">
      <div className="grid overflow-hidden rounded-3xl border border-[#ded8cf] bg-white md:grid-cols-2">
        <div id="localizacao" className="bg-[#302a25] p-8 text-white sm:p-10">
          <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-xs font-medium">Venha conhecer a Forja</span>
          <h2 className="mt-6 text-3xl font-bold">Seu próximo corte<br />começa por aqui.</h2>
          <p className="mt-4 leading-relaxed text-[#d3c8bc]">Um espaço para cuidar do visual, trocar uma ideia e desacelerar.</p>
          <div className="mt-8 flex items-start gap-3">
            <MapPin size={20} className="mt-1 shrink-0 text-[#e69b78]" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">Onde estamos</h3>
              <address className="mt-1 text-sm text-[#d3c8bc] not-italic">Rua das Oficinas, 245 — Centro</address>
            </div>
          </div>
          <div id="agendar" className="mt-7 flex items-start gap-3">
            <Clock size={20} className="mt-1 shrink-0 text-[#e69b78]" aria-hidden="true" />
            <div className="w-full">
              <h3 className="mb-3 font-semibold">Horários de atendimento</h3>
              <dl className="space-y-2 text-sm text-[#d3c8bc]">
                {horarios.map((horario) => (
                  <div key={horario.dia} className="flex flex-wrap justify-between gap-x-4 gap-y-1"><dt>{horario.dia}</dt><dd>{horario.hora}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-bold">Simples, do início ao fim.</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6e655c]">Três passos para sair com o visual em dia.</p>
          <ol className="mt-8 space-y-7">
            {passos.map((passo, index) => (
              <li key={passo.titulo} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7e3da] text-sm font-bold text-[#a94827]">0{index + 1}</span>
                <div>
                  <h3 className="font-semibold">{passo.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6e655c]">{passo.texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-center gap-2 border-t border-[#eee9e2] pt-5 text-sm text-[#6e655c]"><Coffee size={18} className="shrink-0" aria-hidden="true" /> A gente cuida dos detalhes. Você aproveita.</p>
        </div>
      </div>
    </section>
  )
}

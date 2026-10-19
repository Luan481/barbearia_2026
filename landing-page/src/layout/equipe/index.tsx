import { Quote } from 'lucide-react'

const equipe = [
  { nome: 'barbeiro 1', especialidade: 'Cortes clássicos e degradê', iniciais: 'b1' },
  { nome: 'barbeira 2', especialidade: 'Especialista em barba', iniciais: 'b2' },
  { nome: 'barbeiro 3', especialidade: 'Navalha e acabamentos', iniciais: 'b3' },
]

const depoimentos = [
  { texto: 'Saí de lá outro homem. Atenção a cada detalhe, do início ao fim.', nome: 'Marcos T.' },
  { texto: 'Ambiente sem frescura, resultado impecável. Virei cliente fixo.', nome: 'Felipe A.' },
  { texto: 'A barba nunca ficou tão bem alinhada. Vale cada minuto de espera.', nome: 'Igor P.' },
]

export default function Equipe() {
  return (
    <section id="equipe" className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center">
        <span className="rounded-full bg-[#eae3d8] px-4 py-2 text-xs font-semibold">Nossa equipe</span>
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">Quem cuida do seu visual</h2>
        <p className="mt-4 text-[#6e655c]">Mãos experientes. Atenção de verdade.</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {equipe.map((pessoa) => (
          <article key={pessoa.nome} className="rounded-2xl border border-[#ded8cf] bg-white p-7 text-center">
            <div aria-hidden="true" className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#eae3d8] text-2xl font-bold text-[#68523b]">{pessoa.iniciais}</div>
            <h3 className="font-bold">{pessoa.nome}</h3>
            <p className="mt-2 text-sm text-[#6e655c]">{pessoa.especialidade}</p>
          </article>
        ))}
      </div>
      <h2 className="mt-16 text-center text-2xl font-bold">Quem já passou por aqui</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {depoimentos.map((depoimento) => (
          <figure key={depoimento.nome} className="border-t border-[#d7cfc3] pt-6">
            <Quote size={20} className="mb-3 text-[#a94827]" aria-hidden="true" />
            <blockquote className="text-sm leading-relaxed text-[#6e655c]">“{depoimento.texto}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold">{depoimento.nome}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

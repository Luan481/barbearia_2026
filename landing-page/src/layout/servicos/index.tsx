import Cards from '../../components/Cards'
import cards from './cards'

export default function Servicos() {
  return (
    <section id="servicos" className="mx-auto max-w-6xl px-6 py-12">
      <div className="mx-auto max-w-xl text-center">
        <span className="rounded-full bg-[#eae3d8] px-4 py-2 text-xs font-semibold">Nossos serviços</span>
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">Tudo para o seu estilo,<br />num só lugar.</h2>
        <p className="mt-4 leading-relaxed text-[#6e655c]">Do corte ao acabamento, atenção em cada detalhe. Preços fixos, sem surpresa na hora de pagar.</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => <Cards key={card.title} {...card} />)}
      </div>
    </section>
  )
}

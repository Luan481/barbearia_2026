import Button from '../Buttons'

export default function StartNow() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-col items-start justify-between gap-7 rounded-3xl bg-[#302a25] p-8 text-white md:flex-row md:items-center md:p-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold sm:text-3xl">Seu estilo merece cuidado sem correria.</h2>
          <p className="mt-3 leading-relaxed text-[#d3c8bc]">Escolha seu serviço, conheça a equipe e reserve um tempo para você.</p>
        </div>
        <div className="shrink-0"><Button text="Ver horários e localização" link="#contato" /></div>
      </div>
    </section>
  )
}

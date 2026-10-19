import { Scissors, Check } from 'lucide-react'
import Button from '../../components/Buttons'

export default function Hero() {
  return (
    <section id="inicio" className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-16 pb-20 text-center md:pt-24 md:pb-24">
      <span className="inline-flex items-center gap-2 rounded-full bg-[#eae3d8] px-4 py-2 text-xs font-semibold">
        <Scissors size={14} aria-hidden="true" /> Seu estilo, bem cuidado
      </span>
      <h1 className="mt-7 max-w-3xl text-4xl leading-[1.12] font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Corte com precisão.<br /><span className="text-[#b94f2d]">Cuidado em cada detalhe.</span>
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6e655c]">
        Corte, barba e um tempo só pra você. Na Forja, cada atendimento tem atenção total,
        ferramenta afiada e o cuidado de um trabalho bem feito.
      </p>
      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
        <Button text="Conhecer os serviços" link="#servicos" />
        <Button text="Planejar minha visita" link="#contato" variant="outline" />
      </div>
      <ul className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-[#6e655c] sm:text-sm">
        {['Preços sem surpresa', 'Atendimento com cuidado', 'Café coado incluso'].map((text) => (
          <li key={text} className="flex items-center gap-2"><Check size={15} className="text-[#a94827]" aria-hidden="true" />{text}</li>
        ))}
      </ul>
    </section>
  )
}

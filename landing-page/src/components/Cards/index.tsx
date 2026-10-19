import type { ReactNode } from 'react'

interface CardProps {
  title: string
  description: string
  icon: ReactNode
  background: string
  price: string
}

export default function Cards({ title, description, icon, background, price }: CardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#ded8cf] bg-white p-6">
      <div aria-hidden="true" className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${background}`}>{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 mb-6 flex-1 text-sm leading-relaxed text-[#6e655c]">{description}</p>
      <p className="border-t border-[#eee9e2] pt-4 text-lg font-bold text-[#a94827]">R$ {price}<span className="text-sm">,00</span></p>
    </article>
  )
}

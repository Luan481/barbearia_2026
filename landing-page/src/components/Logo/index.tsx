import { Flame } from 'lucide-react'

export default function Logo() {
  return (
    <a href="#inicio" aria-label="Forja Barbearia — início" className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight">
      <Flame size={25} className="text-[#ce6a43]" aria-hidden="true" />
      <span>forja<span className="text-[#ce6a43]">.</span></span>
      <span className="ml-1 border-l border-current/20 pl-3 text-[10px] font-semibold tracking-[0.16em] uppercase">Barbearia</span>
    </a>
  )
}

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '../Buttons'
import Logo from '../Logo'

const links = [
  { text: 'Início', href: '#inicio' },
  { text: 'Serviços', href: '#servicos' },
  { text: 'Equipe', href: '#equipe' },
  { text: 'Contato', href: '#contato' },
]

export default function NavBar() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="border-b border-[#ded8cf]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Logo />
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[#a94827]">{link.text}</a>
          ))}
        </nav>
        <div className="hidden md:block"><Button text="Ver horários" link="#agendar" variant="dark" /></div>
        <button
          type="button"
          className="rounded-full border border-[#ded8cf] p-3 md:hidden"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
        >
          {menuAberto ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuAberto && (
        <nav id="menu-mobile" aria-label="Navegação móvel" className="flex flex-col gap-1 border-t border-[#ded8cf] px-6 py-4 md:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-lg py-3 hover:text-[#a94827]" onClick={() => setMenuAberto(false)}>{link.text}</a>
          ))}
          <a href="#agendar" className="rounded-full bg-[#302a25] px-6 py-3 text-center font-semibold text-white" onClick={() => setMenuAberto(false)}>Ver horários</a>
        </nav>
      )}
    </header>
  )
}

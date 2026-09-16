import { Menu, X, Flame } from "lucide-react";
import { useState } from "react";

function Logo({ className = "" }) {
    return (
        <span className={`font-display text-2xl tracking-wide flex items-center gap-2 ${className}`}>
            <Flame className="w-5 h-5 text-[#C17A34]" strokeWidth={2} />
            FORJA
        </span>
    );
}
export default function NavBar() {
    const [menuAberto, setMenuAberto] = useState(false);


    const navLinks = [
        { label: "Serviços", href: "#servicos" },
        { label: "Equipe", href: "#equipe" },
        { label: "Localização", href: "#localizacao" },
    ];
    return (
        <>
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
        </>
    )
}
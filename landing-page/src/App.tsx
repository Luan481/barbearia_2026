import NavBar from './components/NavBar'
import StartNow from './components/StartNow'
import Hero from './layout/hero'
import Servicos from './layout/servicos'
import Equipe from './layout/equipe'
import Contact from './layout/contact'
import Footer from './layout/footer'

export default function App() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:block focus:p-4">Pular para o conteúdo</a>
      <NavBar />
      <main id="conteudo">
        <Hero />
        <Servicos />
        <StartNow />
        <Equipe />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

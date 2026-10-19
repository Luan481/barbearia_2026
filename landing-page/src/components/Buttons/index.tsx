interface ButtonProps {
  text: string
  link: string
  variant?: 'primary' | 'dark' | 'outline'
}

const styles = {
  primary: 'bg-[#b94f2d] text-white hover:bg-[#9d4023]',
  dark: 'bg-[#302a25] text-white hover:bg-[#493d32]',
  outline: 'border border-[#cfc6ba] text-[#302a25] hover:bg-[#e9e2d8]',
}

export default function Button({ text, link, variant = 'primary' }: ButtonProps) {
  return (
    <a href={link} className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${styles[variant]}`}>{text}</a>
  )
}

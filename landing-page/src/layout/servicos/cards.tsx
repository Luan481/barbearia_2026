import { Scissors, Sparkles, Layers, ScanFace, Eye, Palette } from 'lucide-react'

const cards = [
  { title: 'Corte clássico', description: 'Tesoura e máquina, acabamento na navalha.', price: '60', icon: <Scissors size={21} />, background: 'bg-[#eae3d8] text-[#68523b]' },
  { title: 'Barba completa', description: 'Toalha quente, óleo e navalha.', price: '45', icon: <Sparkles size={21} />, background: 'bg-[#f7e3da] text-[#a94827]' },
  { title: 'Corte + barba', description: 'O combo completo, sem pressa.', price: '95', icon: <Layers size={21} />, background: 'bg-[#f5ebd3] text-[#83621c]' },
  { title: 'Acabamento', description: 'Ajuste de contorno entre cortes.', price: '25', icon: <ScanFace size={21} />, background: 'bg-[#eae3d8] text-[#68523b]' },
  { title: 'Sobrancelha', description: 'Alinhamento na navalha.', price: '20', icon: <Eye size={21} />, background: 'bg-[#f7e3da] text-[#a94827]' },
  { title: 'Coloração', description: 'Cobertura de grisalhos, tom natural.', price: '70', icon: <Palette size={21} />, background: 'bg-[#f5ebd3] text-[#83621c]' },
]

export default cards

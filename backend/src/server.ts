import express from "express"
import { usersRouter } from "./routes/users.routes"
import { servicoRoute } from "./routes/servicos.routes"
import { produtoRouter } from "./routes/produtos.routes"
import { planoRouter } from "./routes/plano.routes"
import { horarioRouter } from "./routes/horarios.routes"
import { agendamentoRouter } from "./routes/agendamentos.routes"
import { agendamentoServicoRouter } from "./routes/agendamento_servicos.routes"
import { vendaRouter } from "./routes/vendas.routes"
import { vendaItemRouter } from "./routes/venda_itens.routes"
import { assinaturaRouter } from "./routes/assinaturas.routes"
import { beneficioAniversarioRouter } from "./routes/beneficios_aniversario.routes"

const port = 3000

export const app = express()

app.use(express.json())
app.use("/users", usersRouter)
app.use("/services", servicoRoute)
app.use("/products", produtoRouter)
app.use("/plans", planoRouter)
app.use("/schedules", horarioRouter)
app.use("/appointments", agendamentoRouter)
app.use("/appointment-services", agendamentoServicoRouter)
app.use("/sales", vendaRouter)
app.use("/sale-items", vendaItemRouter)
app.use("/subscriptions", assinaturaRouter)
app.use("/birthday-benefits", beneficioAniversarioRouter)

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`)
})

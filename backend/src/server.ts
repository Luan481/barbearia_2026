import express, {Request, type Response} from "express";
import { usersRouter } from "./routes/users.routes";
import { servicoRoute } from "./routes/servicos.routes";
import { produtoRouter } from "./routes/produtos.routes";

const app = express()
const port = 3000

app.use(express.json())
app.use("/users", usersRouter)
app.use("/services", servicoRoute)
app.use('/products', produtoRouter)


app.listen(port, ()=>{
    console.log(`API rodando em http://localhost:${port}`)
})
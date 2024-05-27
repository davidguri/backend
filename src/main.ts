import { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes"
import express from "express"
dotenv.config()

const port = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
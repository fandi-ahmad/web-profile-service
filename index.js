const express = require('express')
const app = express()
const port = 8000
const router = require('./routes/router')
const { urlencoded, json } = require('body-parser')
// const { config } = require('dotenv')
// const cookieParser = require('cookie-parser')
// const cors = require('cors')


// config()
// app.use(cors({Credential: true, origin: apiUser() }))
// app.use(cors({credentials: true}))
// app.use(cors())
// app.use(express.json())

// app.use(urlencoded({extended: true}));
app.use(json());

app.use(router)

app.listen(port, () => {
    console.log(`Server ready on port ${port}`)
})
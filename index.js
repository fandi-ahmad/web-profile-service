const express = require('express')
const app = express()
const port = 8000
const router = require('./routes/router')
const multer = require('multer')
const bodyParser = require('body-parser')
const { fileStorage, filterFormat } = require('./middleware/filterImage')
// const { config } = require('dotenv')
// const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')


// config()
// app.use(cors({Credential: true, origin: apiUser() }))
// app.use(express.json())

app.use(cors())
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter: filterFormat}).single('image'))

app.use(router)

app.listen(port, () => {
    console.log(`Server ready on port ${port}`)
})
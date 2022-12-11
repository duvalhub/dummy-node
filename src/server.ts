import express from 'express'
const app = express()

app.get('/healthcheck', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Service is OK'
    })
})
app.get('/', (req, res) => {
    res.json({
        message: 'Hello my lord'
    })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
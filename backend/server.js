

import express from 'express'

const port = process.env.port || 4000

const app = express();

app.get('/', (req, res) => {
   res.status(200).json({message: 'You have got this Yemo!!!!!'})
})


app.listen(port, () => {
    console.log(`server is running on: ${port}`)
})
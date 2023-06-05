import cors from 'cors'
import express from 'express'
import formidable from 'formidable'
import fs from 'fs'

import { CSV } from './csv'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('This is from express.js')
})

app.post('/upload', async (req, res) => {
  try {
    const file = await findUpload(req)
    const csvData = await loadFile(file)
    const products = parseFile(csvData)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ data: products.rows, errors: products.errors }))
  } catch (error) {
    res.writeHead(error.code, { 'Content-Type': 'text/plain' })
    res.end(error.body)
  }
})

function findUpload(req) {
  const uploadSizeLimit = 20_000

  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true })
    form.parse(req, (err, _fields, files) => {
      const csvFile = files.csvFile

      if (err) {
        reject({ code: err.httpCode || 400, body: String(err) })
      }
      if (!csvFile) {
        reject({ code: 400, body: 'Uploaded file not found' })
      }
      if (csvFile.mimetype !== 'text/csv') {
        reject({ code: 422, body: 'Data must be a CSV file' })
      } else {
        resolve(files.csvFile)
      }
    })
  })
}

function loadFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file.filepath, 'utf8', (err, csvData) => {
      if (err) {
        reject({ code: 400, body: String(err) })
      } else {
        resolve(csvData)
      }
    })
  })
}

function parseFile(csvData) {
  try {
    const productData = new CSV(csvData)
    return productData
  } catch (err) {
    throw { code: 422, body: String(err) }
  }
}

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`)
})

import collection from 'lodash/collection'
import cors from 'cors'
import express from 'express'
import formidable from 'formidable'
import fs from 'fs'

import { addImageDimensions } from './product_hydrator'
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
    const hydratedProducts = await hydrateProducts(products)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ data: hydratedProducts.data, errors: hydratedProducts.errors }))
  } catch (error) {
    res.writeHead(error.code, { 'Content-Type': 'text/plain' })
    res.end(error.body)
  }
})

function findUpload(req) {
  /* Very large files may cause the request to timeout while waiting
  for product data to hydrate. There are many ways to solve this robustly
  but for now I am limiting the input size.*/
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
      if (csvFile.size > uploadSizeLimit) {
        reject({ code: 413, body: `Uploaded file must be less than ${uploadSizeLimit / 1000} kB` })
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

function hydrateProducts(productData) {
  return new Promise((resolve, reject) => {
    Promise.all(productData.rows.map(addImageDimensions)).then(hydratedData => {
      // Separate the good data from the errors
      const [data, errors] = collection.partition(hydratedData, product => {
        return product.error_type == null
      })
      // Return data and errors (including errors from earlier steps)
      resolve({
        data: data,
        errors: errors.concat(productData.errors),
      })
    })
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`)
})

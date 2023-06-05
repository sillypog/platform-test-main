import cors from 'cors'
import express from 'express'
import formidable from 'formidable'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('This is from express.js')
})

app.post('/upload', async(req, res) => {
  try {
    const file = await findUpload(req)

    console.log(file)

    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end("Done")
  } catch (error) {
    res.writeHead(error.code, {'Content-Type': 'text/plain'})
    res.end(error.body)
  }
})

function findUpload(req) {
  const uploadSizeLimit = 20_000

  return new Promise((resolve, reject) => {
    const form = formidable({multiples: true})
    form.parse(req, (err, _fields, files) => {
      const csvFile = files.csvFile

      if (err) {
        reject({code: err.httpCode || 400, body: String(err)})
      } if (!csvFile) {
        reject({code: 400, body: "Uploaded file not found"})
      } if (csvFile.mimetype !== "text/csv") {
        reject({code: 422, body: "Data must be a CSV file"})
      } else {
        resolve(files.csvFile)
      }
    })
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`)
})

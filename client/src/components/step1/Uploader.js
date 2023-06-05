import { useState } from 'react'

import ErrorMessage from './ErrorMessage'

const State = {
  pending: 0,
  ready: 1,
  loading: 2,
}

export default function Uploader({ onComplete }) {
  const [file, setFile] = useState(null)
  const [state, setState] = useState(State.pending)
  const [error, setError] = useState('')

  function handleSelect(event) {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    setState(State.ready)
    setError('')
  }

  async function handleSubmit() {
    const formData = new FormData()
    formData.append('csvFile', file)

    // Start displaying loading indicator
    setState(State.loading)

    // Upload the csv file to the server
    const response = await fetch('http://localhost:5001/upload', { method: 'POST', body: formData })
    if (response.ok) {
      const json = await response.json()
      onComplete(json)
    } else {
      const error = await response.text()
      setState(State.pending)
      setError(error)
    }
  }

  function getContentForState(state) {
    switch (state) {
      case State.pending:
        return <input type="file" name="file" accept=".csv,text/csv" onChange={handleSelect} />
      case State.ready:
        return (
          <>
            <input type="file" name="file" onChange={handleSelect} />
            <button onClick={handleSubmit}>Upload CSV</button>
          </>
        )
      case State.loading:
        return <p>Loading...</p>
      default:
        return <p>Error: Unknown upload state</p>
    }
  }

  return (
    <div className="UploadButton bordered">
      {getContentForState(state)}
      <ErrorMessage message={error} />
    </div>
  )
}

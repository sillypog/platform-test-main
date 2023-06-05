import './App.css'

import { useState } from 'react'

import NavBar from './components/nav/NavBar'
import ProductList from './components/step2/ProductList'

function App() {
  const steps = ['Import', 'Results']
  const [currentStep, setCurrentStep] = useState(1)
  const [products, setProducts] = useState({
    "data": [
      {
        "id": "5fad005c0c99a330152772cf",
        "name": "alyx",
        "picture": {
          "url": "https://res.cloudinary.com/hubstairs/image/upload/v1620083393/production/7dea6f.png",
          "width": 640,
          "height": 480
        }
      },
      {
        "id": "5fad00880c99a330152772ff",
        "name": "corinna",
        "picture": {
          "url": "https://res.cloudinary.com/hubstairs/image/upload/v1620083399/production/8f96eb2b.png",
          "width": 640,
          "height": 480
        }
      }
    ], "errors": [
      {
        "id": "608aa25426d6b81bac4fd43a",
        "name": "kitty",
        "picture": {
            "url": "https://res.cloudinary.com/hubstairs/image/upload/v1620106682/production/gbzyafkzanpet1zvguhu.png"
        },
        "error_type": "Image Not Found"
      },
      {
        "error_type": "Bad Entry",
        "input": "Bad line",
        "line_number": 15
      }
    ]
  });

  function changeStep(increment) {
    if (currentStep + increment < 0 || currentStep + increment >= steps.length) {
      return
    }

    setCurrentStep(currentStep + increment)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nfinite Product Uploader</h1>
      </header>
      <main>
        <NavBar steps={steps} currentStep={currentStep} onBack={changeStep} />
        <ProductList products={products}/>
      </main>
    </div>
  )
}

export default App

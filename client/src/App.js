import './App.css'

import { useState } from 'react'

import NavBar from './components/nav/NavBar'
import ProductList from './components/step2/ProductList'
import Uploader from './components/step1/Uploader'

function App() {
  const steps = ['Import', 'Results']
  const [currentStep, setCurrentStep] = useState(1)
  const [products, setProducts] = useState(
    {data:[], errors:[]}
  )

  function handleData(json) {
    setProducts(json);
    changeStep(1)
  }

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
        <Uploader onComplete={handleData}/>
        <ProductList products={products} />
      </main>
    </div>
  )
}

export default App

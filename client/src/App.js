import './App.css'

import { useState } from 'react';

import NavBar from './components/nav/NavBar'

function App() {
  const steps = ["Import", "Results"]
  const [currentStep, setCurrentStep] = useState(0)

  function changeStep(increment) {
    if (currentStep + increment < 0 || currentStep + increment >= steps.length) {
      return;
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
        <button onClick={() => {changeStep(1)}} >Step Forward</button>
      </main>
    </div>
  )
}

export default App

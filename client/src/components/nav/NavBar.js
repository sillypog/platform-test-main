import BackButton from './BackButton'
import StepIndicator from './StepIndicator'

export default function NavBar({ steps, currentStep, onBack }) {
  const stepIndicators = steps.map((stepName, stepNumber) => {
    const isActive = currentStep === stepNumber
    return <StepIndicator key={stepNumber} stepName={stepName} active={isActive} />
  })

  return (
    <nav>
      <BackButton step={currentStep} onBack={onBack} />
      <ol className="StepIndicators bordered">{stepIndicators}</ol>
    </nav>
  )
}

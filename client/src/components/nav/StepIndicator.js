export default function StepIndicator({ stepName, active }) {
  return (
    <li className={active ? 'activeStep' : 'inactiveStep'}>
      <h1>{stepName}</h1>
    </li>
  )
}

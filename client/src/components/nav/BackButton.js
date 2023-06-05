export default function BackButton({ step, onBack }) {
  if (step > 0) {
    return (
      <button
        className="BackButton"
        onClick={() => {
          onBack(-1)
        }}
      >
        &lt; Back
      </button>
    )
  } else {
    return null
  }
}

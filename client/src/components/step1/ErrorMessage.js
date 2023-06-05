export default function ErrorMessage({message}) {
  if (message) {
      return <p className="error">{message}</p>
  } else {
      return null
  }
}
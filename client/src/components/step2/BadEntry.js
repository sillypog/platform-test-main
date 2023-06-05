export default function BadEntry({entry}) {
  return (
    <li className="Product bordered error">
      <h1>Bad entry at line {entry.line_number}</h1>
      <p>{entry.input}</p>
    </li>
  )
}
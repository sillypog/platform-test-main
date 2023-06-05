export default function CloudinaryAccessErrorEntry({ entry }) {
  return (
    <li className="Product bordered error">
      <h1>{entry.name}</h1>
      <p>Product ID: {entry.id}</p>
      <p>Cloudinary did not accept the server credentials</p>
    </li>
  )
}

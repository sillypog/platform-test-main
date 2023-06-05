export default function CloudinaryErrorEntry({entry}) {  
  return (
    <li className="Product bordered error">
      <h1>{entry.name}</h1>
      <p>Product ID: {entry.id}</p>
      <p>Cloudinary error for {entry.picture.url}</p>
    </li>
  )
}
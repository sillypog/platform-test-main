export default function MissingImageEntry({entry}) {  
  return (
    <li className="Product bordered error">
      <h1>{entry.name}</h1>
      <p>Product ID: {entry.id}</p>
      <p>Image not found at {entry.picture.url}</p>
      <img src="https://placehold.co/300x200?text=Image+Not+Found" width="300" height="200" alt=""/>
    </li>
  )
}
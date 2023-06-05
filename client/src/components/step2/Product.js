export default function Product({product}) {
  const dimensionText = `${product.picture.width} x ${product.picture.height}`;

  return (
    <li className="Product bordered">
      <h1>{product.name}</h1>
      <p>Product ID: {product.id}</p>
      <p>Image Dimensions: {dimensionText}</p>
      <img src={product.picture.url} width={product.picture.width} height={product.picture.height} alt=""/>
    </li>
  )
}
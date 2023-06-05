import BadEntry from './BadEntry'
import CloudinaryErrorEntry from './CloudinaryErrorEntry';
import CloudinaryAccessErrorEntry from './CloudinaryAccessErrorEntry';
import MissingImageEntry from './MissingImageEntry';
import Product from './Product'

export default function ProductList({products}) {
  const productList = products.data.map(product =>
    <Product key={product.id} product={product}/>
  );

  const errorList = products.errors.map(product => {
    switch (product.error_type) {
      case "Bad Entry": return <BadEntry key={product.line_number} entry={product} />
      case "Image Not Found": return <MissingImageEntry key={product.id} entry={product}/>
      case "Cloudinary Access Error": return <CloudinaryAccessErrorEntry key={product.id} entry={product}/>
      case "Cloudinary Error": return <CloudinaryErrorEntry key={product.id} entry={product}/>
      default: return <p className="Product bordered error">Unknown error type</p>
    }
  });

  return (
    <>
      <ul className="bulletless">{productList}</ul>
      <ul className="bulletless">{errorList}</ul>
    </>
  );
}
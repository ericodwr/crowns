import { Link } from 'react-router-dom';

import './category-preview.styles.scss';
import ProductCard from '../product-card/ProductCard';

export type Category = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

const CategoryPreview = ({
  title,
  products,
}: {
  title: string;
  products: Category[];
}) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={`/shop/${title}`}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {/* filter only show first 4 products */}
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;

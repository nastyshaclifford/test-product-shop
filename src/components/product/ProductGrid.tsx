import type { Product } from '../../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 px-3">
        {products.map((product) => (
        <ProductCard key={product.id} product={product} />
    ))}
    </div>
);
}
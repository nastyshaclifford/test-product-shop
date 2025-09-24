import { Heart, X } from 'lucide-react';
import { useAppDispatch } from '../../hooks/redux';
import { toggleLike, removeProduct } from '../../store/productSlice';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleCardClick = () => navigate(`/products/${product.id}`);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      dispatch(removeProduct(product.id));
    }
  };  

  return (
    <div className="col">
      <div
        className="card h-100 border-0 bg-white position-relative overflow-hidden"
        onClick={handleCardClick}
        style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div className="position-relative overflow-hidden">
          <img
            src={product.image}
            className="card-img-top"
            alt={product.title}
            style={{ height: '250px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />

          <span className="badge bg-dark position-absolute top-0 start-0 m-3 px-3 py-2"
                style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
            {product.category}
          </span>

          <button
          onClick={handleRemove}
          className="btn position-absolute top-0 end-0 m-3 p-1 bg-white rounded-circle border-0"
          style={{ 
            width: '28px', 
            height: '28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#dc3545';
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(220,53,69,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
          }}
        >
          <X 
            size={14} 
            className="text-dark"
            style={{ transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#000'}
          />
        </button>
        </div>

        <div className="card-body d-flex flex-column p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title fw-light text-dark mb-0" style={{ letterSpacing: '0.5px' }}>
              {product.title}
            </h5>
            <button
              onClick={handleToggleLike}
              className={`btn p-0 border-0 bg-transparent ${product.isLiked ? 'text-gold' : 'text-muted'}`}
            >
              <Heart size={20} fill={product.isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>

          <p className="card-text text-muted fw-light mb-4" style={{ 
            lineHeight: '1.4', 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
          }}>
            {product.description}
          </p>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="h5 text-dark fw-light mb-0">{product.price.toFixed(2)} $ </span>
            <button className="btn btn-outline-dark border-1 px-3 py-2" style={{ fontSize: '12px' }}>
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




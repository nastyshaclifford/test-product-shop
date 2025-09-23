import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { ArrowLeft, Heart, Star } from 'lucide-react';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useAppSelector((state) =>
    state.products.items.find((item) => item.id === id)
  );

  if (!product) {
    return (
      <div className="container py-5 text-center bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div>
          <h1 className="h4 mb-4 fw-light text-dark">Продукт не найден</h1>
          <Link to="/products" className="btn btn-outline-dark px-4 py-2 border-1">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 bg-light min-vh-100" style={{ maxWidth: '1200px' }}>
      <Link to="/products" className="d-inline-flex align-items-center mb-4 text-dark text-decoration-none fw-light" style={{ letterSpacing: '0.5px' }}>
        <ArrowLeft className="me-2" size={18} />
        Назад к каталогу
      </Link>

      <div className="card border-0 bg-white">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid w-100"
              style={{ height: '500px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="card-body p-5">
              <h2 className="h4 fw-light text-dark mb-3" style={{ letterSpacing: '1px' }}>{product.title}</h2>

              <div className="d-flex align-items-center mb-4">
                <Star className="text-warning me-2" size={18} fill="currentColor" />
                <span className="fw-light">{product.rating.rate}</span>
                <span className="mx-3 text-muted">•</span>
                <span className="badge bg-dark text-light px-3 py-2" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                  {product.category}
                </span>
              </div>

              <div className="h3 fw-light text-dark mb-4">{product.price.toFixed(2)} ₽</div>

              <p className="text-muted mb-4 fw-light" style={{ lineHeight: '1.6' }}>{product.description}</p>

              <div className="mb-4">
                <span className={`badge px-3 py-2 ${product.isLiked ? 'bg-gold text-dark' : 'bg-light text-dark border-1'}`} style={{ fontSize: '12px' }}>
                  {product.isLiked ? <Heart className="me-2" size={14} fill="currentColor" /> : null}
                  {product.isLiked ? 'В избранном' : 'Добавить в избранное'}
                </span>
              </div>

              <button 
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                    className="btn btn-dark px-5 py-3 border-0 w-100" 
                    style={{ letterSpacing: '1px' }}
                    >
                РЕДАКТИРОВАТЬ
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


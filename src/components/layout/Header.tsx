import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Plus } from 'lucide-react';

export default function Header() {
    const location = useLocation();

return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3">
        <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center fw-light text-dark" style={{ letterSpacing: '2px' }}>
            <ShoppingBag className="me-2" size={24} />
            PRODUCT SHOP
        </Link>

        <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item me-4">
                <Link
                to="/products"
                className={`nav-link fw-light ${location.pathname === '/products' ? 'text-dark' : 'text-muted'}`}
                style={{ letterSpacing: '1px' }}
                >
                КАТАЛОГ
                </Link>
            </li>
            <li className="nav-item">
                <Link
                to="/create-product"
                className="btn btn-dark d-flex align-items-center px-4 py-2 border-0"
                style={{ letterSpacing: '0.5px' }}
                >
                <Plus className="me-2" size={18} />
                Новый товар
                </Link>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    );
}
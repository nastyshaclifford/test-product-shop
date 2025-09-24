import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Plus } from 'lucide-react';

export default function Header() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom py-2 py-md-3">
            <div className="container">
                <Link to="/" className="navbar-brand d-flex align-items-center fw-light text-dark" style={{ letterSpacing: '2px' }}>
                    <ShoppingBag className="me-2" size={24} />
                    <span className="d-none d-sm-inline">PRODUCT SHOP</span>
                    <span className="d-inline d-sm-none">PS</span>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto align-items-center gap-2 gap-md-3">
                        <li className="nav-item">
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
                                className="btn btn-dark d-flex align-items-center px-3 px-md-4 py-2 border-0"
                            >
                                <Plus className="me-1 me-md-2" size={18} />
                                <span>Новый товар</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
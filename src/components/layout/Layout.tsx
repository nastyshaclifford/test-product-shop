import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
        <Header />
            <main className="flex-grow-1 bg-light">
        <Outlet />
        </main>
        <Footer />
    </div>
    );
}
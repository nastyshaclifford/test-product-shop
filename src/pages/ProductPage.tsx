import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { setFilter, fetchProducts } from '../store/productSlice';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import FilterButtons from '../components/product/FilterButtons';
import ProductGrid from '../components/product/ProductGrid';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';

export default function ProductsPage() {
    const dispatch = useAppDispatch();
    const { items, filter, status, error } = useAppSelector((state) => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

useEffect(() => {
    if (status === 'idle') {
        dispatch(fetchProducts());
    }
}, [status, dispatch]);

    const filteredProducts = filter === 'liked' ? items.filter(p => p.isLiked) : items;

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleFilterChange = (newFilter: 'all' | 'liked') => {
    dispatch(setFilter(newFilter));
    setCurrentPage(1);
    };

    if (status === 'loading') {
    return <LoadingSpinner />;
    }

    if (status === 'failed') {
    return <ErrorState error={error} onRetry={() => dispatch(fetchProducts())} />;
    }

return (
    <div className="container-fluid py-5 bg-light min-vh-100">
    <div className="text-center mb-5 px-3">
        <h1 className="display-4 fw-light text-dark mb-3" style={{ letterSpacing: '2px' }}>КАТАЛОГ</h1>
        <p className="text-muted fs-5" style={{ letterSpacing: '1px' }}>
            Эксклюзивная коллекция товаров
        </p>
    </div>

    <FilterButtons 
        filter={filter} 
        onFilterChange={handleFilterChange} 
    />

    {paginatedItems.length === 0 ? (
        <EmptyState filter={filter} />
    ) : (
        <>
            <ProductGrid products={paginatedItems} />
            <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />
        </>
    )}
    </div>
    );
}









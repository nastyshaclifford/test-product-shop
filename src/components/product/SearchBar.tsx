import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSearchQuery } from '../../store/productSlice'; 
import { Search } from 'lucide-react';

export default function SearchBar() {
    const dispatch = useAppDispatch();
    const { searchQuery } = useAppSelector((state) => state.products);

    return (
        <div className="position-relative mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Search 
                size={20} 
                className="position-absolute top-50 start-3 translate-middle-y text-muted" 
            />
            <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="form-control border-1 ps-5 py-2"
                style={{ borderRadius: '25px' }}
            />
        </div>
    );
}
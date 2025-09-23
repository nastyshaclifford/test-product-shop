import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSortBy } from '../../store/productSlice';
import type { SortOption } from '../../store/productSlice';

export default function SortDropdown() {
    const dispatch = useAppDispatch();
    const { sortBy } = useAppSelector((state) => state.products);

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: 'default', label: 'Без сортировки' },
        { value: 'name_asc', label: 'По названию (A-Z)' },
        { value: 'name_desc', label: 'По названию (Z-A)' },
        { value: 'price_asc', label: 'По цене (сначала дешевые)' },
        { value: 'price_desc', label: 'По цене (сначала дорогие)' },
        { value: 'rating', label: 'По рейтингу' },
    ];

    return (
        <div className="mb-4 px-3 mx-auto" style={{ maxWidth: '300px' }}>
            <select 
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
                className="form-select py-2"
                style={{ 
                    borderRadius: '25px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    border: '1px solid #6c757d',
                    color: '#495057',
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = '#495057';
                    e.target.style.boxShadow = '0 0 0 2px rgba(73, 80, 87, 0.1)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = '#6c757d';
                    e.target.style.boxShadow = 'none';
                }}
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
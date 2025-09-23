import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setSearchQuery } from '../../store/productSlice'; 

export default function SearchBar() {
    const dispatch = useAppDispatch();
    const { searchQuery } = useAppSelector((state) => state.products);

    return (
        <div className="mx-auto mb-5 px-3">
                <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    className="search-input form-control ps-5 py-3"
                />
            </div>
    );
}
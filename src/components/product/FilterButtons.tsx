interface FilterButtonsProps {
    filter: string;
    onFilterChange: (filter: 'all' | 'liked') => void;
}

export default function FilterButtons({ filter, onFilterChange }: FilterButtonsProps) {
    return (
        <div className="d-flex justify-content-center mb-5">
        <div className="btn-group" role="group">
            <button
            onClick={() => onFilterChange('all')}
            className={`btn px-4 py-2 border-1 ${filter === 'all' ? 'btn-dark text-light' : 'btn-outline-dark bg-white text-dark'}`}
            >
            Все товары
        </button>
        <button
            onClick={() => onFilterChange('liked')}
            className={`btn px-4 py-2 border-1 ${filter === 'liked' ? 'btn-dark text-light' : 'btn-outline-dark bg-white text-dark'}`}
        >
            Избранное
        </button>
        </div>
        </div>
    );
}
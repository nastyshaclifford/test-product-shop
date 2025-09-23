interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <nav className="mt-5">
        <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
                className="page-link border-0 bg-transparent text-dark px-4 py-2" 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ letterSpacing: '0.5px' }}
            >
            ← Назад
            </button>
            </li>

        {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <button 
                className="page-link border-1 px-3 py-2 mx-1" 
                onClick={() => onPageChange(i + 1)}
                style={{ 
                    background: currentPage === i + 1 ? '#000' : 'transparent',
                    color: currentPage === i + 1 ? '#fff' : '#000',
                    borderColor: '#000',
                    borderRadius: '0'
                }}
            >
                {i + 1}
            </button>
            </li>
        ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
                className="page-link border-0 bg-transparent text-dark px-4 py-2" 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ letterSpacing: '0.5px' }}
            >
            Вперед →
            </button>
            </li>
        </ul>
        </nav>
    );
}
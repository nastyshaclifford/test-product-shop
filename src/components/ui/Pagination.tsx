interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);
        
        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <nav className="mt-5" aria-label="Навигация по страницам">
            <ul className="pagination justify-content-center flex-wrap">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                        className="page-link border-0 bg-transparent text-dark px-3 px-sm-4 py-2" 
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Предыдущая страница"
                    >
                        <span className="d-none d-sm-inline">← Назад</span>
                        <span className="d-sm-none">←</span>
                    </button>
                </li>

                {visiblePages[0] > 1 && (
                    <>
                        <li className="page-item">
                            <button 
                                className="page-link border-1 px-3 py-2 mx-1" 
                                onClick={() => onPageChange(1)}
                                style={{ 
                                    background: 'transparent',
                                    color: '#000',
                                    borderColor: '#000',
                                }}
                            >
                                1
                            </button>
                        </li>
                        {visiblePages[0] > 2 && (
                            <li className="page-item disabled">
                                <span className="page-link border-0">...</span>
                            </li>
                        )}
                    </>
                )}

                {visiblePages.map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button 
                            className="page-link border-1 px-3 py-2 mx-1" 
                            onClick={() => onPageChange(page)}
                            style={{ 
                                background: currentPage === page ? '#000' : 'transparent',
                                color: currentPage === page ? '#fff' : '#000',
                                borderColor: '#000',
                                borderRadius: '0',
                                minWidth: '44px'
                            }}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {visiblePages[visiblePages.length - 1] < totalPages && (
                    <>
                        {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                            <li className="page-item disabled">
                                <span className="page-link border-0">...</span>
                            </li>
                        )}
                        <li className="page-item">
                            <button 
                                className="page-link border-1 px-3 py-2 mx-1" 
                                onClick={() => onPageChange(totalPages)}
                                style={{ 
                                    background: 'transparent',
                                    color: '#000',
                                    borderColor: '#000',
                                }}
                            >
                                {totalPages}
                            </button>
                        </li>
                    </>
                )}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                        className="page-link border-0 bg-transparent text-dark px-3 px-sm-4 py-2" 
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Следующая страница"
                    >
                        <span className="d-none d-sm-inline">Вперед →</span>
                        <span className="d-sm-none">→</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
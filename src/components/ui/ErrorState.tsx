interface ErrorStateProps {
    error: string | null;
    onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
    const errorMessage = error || 'Произошла неизвестная ошибка';
    
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="card shadow-lg p-5 text-center bg-white border-0">
            <h2 className="fw-light mb-3 text-dark">Ошибка загрузки</h2>
            <p className="text-muted mb-4">{errorMessage}</p>
        <button 
            onClick={onRetry} 
            className="btn btn-outline-dark px-4 py-2 border-1"
            style={{ letterSpacing: '0.5px' }}
        >
            Попробовать снова
        </button>
        </div>
    </div>
    );
}
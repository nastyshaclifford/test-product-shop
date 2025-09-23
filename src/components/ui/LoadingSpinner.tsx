export default function LoadingSpinner() {
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="text-center">
                <div className="spinner-border text-gold" role="status" style={{ width: '3rem', height: '3rem' }}>
                </div>
                <p className="mt-4 text-dark fs-5 fw-light">Загружаем продукты...</p>
            </div>
        </div>
    );
}
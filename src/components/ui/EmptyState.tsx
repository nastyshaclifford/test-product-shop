interface EmptyStateProps {
    filter: string;
}

export default function EmptyState({ filter }: EmptyStateProps) {
    return (
        <div className="text-center py-5">
            <div className="card p-5 bg-white border-0" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h3 className="fw-light mb-3 text-dark">
            {filter === 'liked' ? 'Нет избранных товаров' : 'Товары не найдены'}
            </h3>
            </div>
        </div>
    ); 
}
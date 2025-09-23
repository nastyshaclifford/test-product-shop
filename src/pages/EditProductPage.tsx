import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { updateProduct } from '../store/productSlice'; 
import type { ProductFormData } from '../types/product'; 

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const product = useAppSelector((state) =>
    state.products.items.find((item) => item.id === id)
  );

  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image: product.image
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h1 className="h4 mb-4">Продукт не найден</h1>
        <button 
          onClick={() => navigate('/products')}
          className="btn btn-outline-dark"
        >
          Вернуться к каталогу
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProduct = {
      ...product,
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image
    };

    dispatch(updateProduct(updatedProduct));
    navigate(`/products/${product.id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-4">
        <button 
          onClick={() => navigate(`/products/${product.id}`)}
          className="btn btn-outline-secondary me-3"
        >
          ← Назад
        </button>
        <h1>Редактировать товар</h1>
      </div>

      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Название *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Описание *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-control"
            rows={4}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Цена *</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Категория *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="electronics">Электроника</option>
            <option value="clothing">Одежда</option>
            <option value="home">Дом</option>
            <option value="beauty">Красота</option>
            <option value="sports">Спорт</option>
            <option value="custom">Другое</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Ссылка на изображение *</label>
          <input
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        {formData.image && (
          <div className="mb-3">
            <label className="form-label">Предпросмотр:</label>
            <img 
              src={formData.image} 
              alt="Preview" 
              className="img-fluid rounded"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}

        <div className="d-flex gap-2">
          <button 
            type="button" 
            onClick={() => navigate(`/products/${product.id}`)}
            className="btn btn-outline-dark px-4 py-2"
          >
            Отмена
          </button>
          <button type="submit" className="btn btn-dark border-0 px-4 py-2">
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
}
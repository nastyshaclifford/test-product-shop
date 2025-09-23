import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { addProduct } from '../store/productSlice';
import { ArrowLeft } from 'lucide-react';

export default function CreateProductPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: 'custom'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }
};

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Название обязательно';
    if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
    if (!formData.price.trim() || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Введите корректную цену';
    }
    if (!formData.image.trim()) newErrors.image = 'Ссылка на изображение обязательна';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(
        addProduct({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          image: formData.image,
          category: formData.category || 'custom', 
        })
      );
      navigate('/products');
    }
  };

  return (
    <div className="container-fluid py-5 bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="d-flex align-items-center mb-5">
            <button 
              onClick={() => navigate('/products')} 
              className="btn btn-outline-dark border-1 me-3 d-flex align-items-center px-3 py-2"
            >
              <ArrowLeft size={18} className="me-1" />
            </button>
            <h1 className="h3 fw-light text-dark mb-0" style={{ letterSpacing: '1px' }}>
              ДОБАВИТЬ ТОВАР
            </h1>
          </div>

          {/* Форма */}
          <div className="card border-0 bg-white p-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="form-label fw-light text-dark" style={{ letterSpacing: '0.5px' }}>
                  Название товара *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className={`form-control border-1 px-3 py-2 ${errors.title ? 'is-invalid' : ''}`}
                  placeholder="Введите название товара"
                  style={{ borderRadius: '0' }}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="form-label fw-light text-dark" style={{ letterSpacing: '0.5px' }}>
                  Описание *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`form-control border-1 px-3 py-2 ${errors.description ? 'is-invalid' : ''}`}
                  placeholder="Опишите товар..."
                  style={{ borderRadius: '0', resize: 'none' }}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="form-label fw-light text-dark">
                    Категория *
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select border-1 px-3 py-2"
                    style={{ borderRadius: '0' }}
                >
                    <option value="electronics">Электроника</option>
                    <option value="clothing">Одежда</option>
                    <option value="home">Дом</option>
                    <option value="beauty">Красота</option>
                    <option value="sports">Спорт</option>
                    <option value="custom">Другое</option>
                </select>
                </div>

              <div className="mb-4">
                <label htmlFor="price" className="form-label fw-light text-dark" style={{ letterSpacing: '0.5px' }}>
                  Цена ₽ *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className={`form-control border-1 px-3 py-2 ${errors.price ? 'is-invalid' : ''}`}
                  placeholder="0.00"
                  style={{ borderRadius: '0' }}
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>

              <div className="mb-5">
                <label htmlFor="image" className="form-label fw-light text-dark" style={{ letterSpacing: '0.5px' }}>
                  Ссылка на изображение *
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  className={`form-control border-1 px-3 py-2 ${errors.image ? 'is-invalid' : ''}`}
                  placeholder="https://example.com/image.jpg"
                  style={{ borderRadius: '0' }}
                />
                {errors.image && <div className="invalid-feedback">{errors.image}</div>}
              </div>

              <div className="d-flex justify-content-between">
                <button 
                  type="button" 
                  onClick={() => navigate('/products')} 
                  className="btn btn-outline-dark border-1 px-4 py-2"
                  style={{ letterSpacing: '0.5px' }}
                >
                  ОТМЕНА
                </button>
                <button 
                  type="submit" 
                  className="btn btn-dark px-4 py-2 border-0"
                  style={{ letterSpacing: '0.5px' }}
                >
                  ДОБАВИТЬ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

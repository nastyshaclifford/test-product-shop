import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/product';

// Добавляем mock данные в начале файла
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Classic White T-Shirt',
    price: 19.99,
    description: 'Comfortable cotton t-shirt for everyday wear',
    category: 'clothing',
    image: 'https://picsum.photos/300/300?random=1',
    rating: { rate: 4.5, count: 120 },
    isLiked: false
  },
  {
    id: '2', 
    title: 'Wireless Bluetooth Headphones',
    price: 89.99,
    description: 'High-quality sound with noise cancellation',
    category: 'electronics',
    image: 'https://picsum.photos/300/300?random=2',
    rating: { rate: 4.3, count: 85 },
    isLiked: false
  },
  {
    id: '3',
    title: 'Stainless Steel Water Bottle',
    price: 24.99,
    description: 'Keep your drinks hot or cold for hours',
    category: 'home',
    image: 'https://picsum.photos/300/300?random=3',
    rating: { rate: 4.7, count: 200 },
    isLiked: false
  },
  {
    id: '4',
    title: 'Organic Green Tea',
    price: 12.99,
    description: 'Premium quality organic green tea leaves',
    category: 'food',
    image: 'https://picsum.photos/300/300?random=4',
    rating: { rate: 4.2, count: 150 },
    isLiked: false
  },
  {
    id: '5',
    title: 'Yoga Mat Premium',
    price: 34.99,
    description: 'Non-slip yoga mat for comfortable exercises',
    category: 'sports',
    image: 'https://picsum.photos/300/300?random=5',
    rating: { rate: 4.6, count: 90 },
    isLiked: false
  },
  {
    id: '6',
    title: 'Leather Wallet',
    price: 45.99,
    description: 'Genuine leather wallet with multiple card slots',
    category: 'accessories',
    image: 'https://picsum.photos/300/300?random=6',
    rating: { rate: 4.4, count: 75 },
    isLiked: false
  }
];

export type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating';

interface ProductsState {
    items: Product[];
    filter: 'all' | 'liked';
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    searchQuery: string;
    sortBy: SortOption;
}

const initialState: ProductsState = {
    items: [], 
    filter: 'all', 
    status: 'idle',
    error: null,
    searchQuery: '',
    sortBy: 'default',
};

interface DummyJsonProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

// ОБНОВЛЯЕМ fetchProducts с обработкой ошибок
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 секунд таймаут

            const response = await fetch('https://dummyjson.com/products?limit=100', {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            return data.products.map((product: DummyJsonProduct) => ({
                id: product.id.toString(),
                title: product.title, 
                description: product.description, 
                price: product.price,
                image: product.thumbnail,
                isLiked: false,
                rating: {
                    rate: product.rating, 
                    count: product.stock || 0 
                },
                category: product.category
            }));
            
        } catch (error) {
            console.warn('API request failed, using mock data:', error);
            // Возвращаем mock данные вместо ошибки
            return mockProducts;
        }
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState, 
    reducers: {
        addProduct: (state, action: PayloadAction<Omit<Product, 'id' | 'isLiked' | 'rating'>>) => {
            const newProduct: Product = {
                ...action.payload,
                id: nanoid(),
                isLiked: false,
                rating: { 
                    rate: 0,
                    count: 0
                }
            };
            state.items.unshift(newProduct);
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(product => product.id !== action.payload);
        },
        toggleLike: (state, action: PayloadAction<string>) => {
            const product = state.items.find(item => item.id === action.payload);
            if (product) {
                product.isLiked = !product.isLiked;
            }
        },
        setFilter: (state, action: PayloadAction<'all' | 'liked'>) => {
            state.filter = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
            state.items[index] = action.payload;
            }
        },
        setSortBy: (state, action: PayloadAction<SortOption>) => {
            state.sortBy = action.payload;
        },    
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state) => {
            state.status = 'succeeded'; // Меняем на succeeded чтобы показать mock данные
            state.items = mockProducts; // Устанавливаем mock данные
            state.error = 'Using demo data (API unavailable)';
        });
    },
});

export const { addProduct, removeProduct, toggleLike, setFilter, setSearchQuery, updateProduct, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;
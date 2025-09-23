import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/product';

interface ProductsState {
    items: Product[];
    filter: 'all' | 'liked';
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    searchQuery: string;
}

const initialState: ProductsState = {
    items: [], 
    filter: 'all', 
    status: 'idle',
    error: null,
    searchQuery: '',
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


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();

        return data.products.map((product: DummyJsonProduct) => ({
            id: product.id.toString(),
            title: product.title, 
            description: product.description, 
            price: product.price,
            image: product.thumbnail,
            isLiked: false,
            rating: {
                rate: product.rating, // предполагая, что API возвращает число
                count: 0 // или product.reviewsCount или другое поле
            },
            category: product.category
        }));
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
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch products';
        });
    },
});

export const { addProduct, removeProduct, toggleLike, setFilter, setSearchQuery, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
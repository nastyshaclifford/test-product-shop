import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import { loadState, saveState } from '../utils/localStorage';

// Убираем тип из импорта, создаем интерфейс прямо здесь
interface AppState {
  products: ReturnType<typeof productsReducer>;
}

const persistedState = loadState() as AppState | undefined;

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState() as AppState);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
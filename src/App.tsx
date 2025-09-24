import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductsPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailsPage";
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage'; 
import Layout from './components/layout/Layout';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="create-product" element={<CreateProductPage />} />
            <Route path="edit-product/:id" element={<EditProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

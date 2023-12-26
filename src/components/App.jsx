import '../styles/App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext.jsx';
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Layout from './layout/Layout.jsx';
import Home from './Home.jsx';
import CategoriesList from './categories/CategoriesList.jsx';
import CategoryAdd from './categories/CategoryAdd.jsx';
import CategoryEdit from './categories/CategoryEdit.jsx';
import CategoryEditList from './categories/CategoryEditList.jsx';
import ProductsList from './products/ProductsList.jsx';
import ProductDetail from './products/ProductDetail.jsx';
import ProductAdd from './products/ProductAdd.jsx';
import ProductEditList from './products/ProductEditList.jsx';
import ProductEdit from './products/ProductEdit.jsx';
import CartDetail from './cart/CartDetail.jsx';
import Login from './login-register/Login.jsx';
import Register from './login-register/Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import NoMatch from './NoMatch.jsx';

const queryClient = new QueryClient();

const getUserInfo = async (token) => {
  const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  }

  return json;
};

function App() {
  //Auth context
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({
    //cambiar aca
    name: '',
  });

  const handleLogin = (tokenParam) => {
    console.log(tokenParam);

    setToken(tokenParam);

    //let queryUser = useQuery({
    //queryKey: ['user'],
    //queryFn: getUserInfo(tokenParam),
    //});

    localStorage.setItem(
      'user',
      JSON.stringify({
        user,
      })
    );
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const valueUser = {
    user,
    token,
    handleLogin,
    handleLogout,
  };

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      console.log('no hay user');

      setUser({
        user: 'hola',
      });
    }
  }, [token, user, setUser]);

  //Cart context
  const [cart, setCart] = useState({
    products: [],
  });

  const handleAddCartProduct = (product, quantityParam, image) => {
    let newProducts = [...cart.products];
    const obj = newProducts.find((p) => p.id === product.id);

    if (obj) {
      //si ya existe el producto en carrito
      obj['quantity'] = obj['quantity'] + quantityParam;
      console.log('ya existe producto');
      console.log(newProducts);
    } else {
      //si no existe
      let myProduct = {
        id: product.id,
        title: product.title,
        image: image,
        description: product.description,
        price: product.price,
        quantity: quantityParam,
      };
      newProducts = [...newProducts, myProduct];
    }

    setCart({
      products: newProducts,
    });

    console.log(cart);

    localStorage.setItem(
      'cart',
      JSON.stringify({
        products: newProducts,
      })
    );
  };

  const handleDeleteCartProduct = (id) => {
    const newProducts = cart.products.filter((product) => product.id != id);

    setCart({
      products: newProducts,
    });

    localStorage.setItem(
      'cart',
      JSON.stringify({
        products: newProducts,
      })
    );
  };

  const handleCleanCart = () => {
    setCart({
      products: []
    })
    localStorage.removeItem('cart');
  }

  const handleNewQuantity = (id, quantityParam) => {
    let newProducts = [...cart.products];
    const obj = newProducts.find((p) => p.id === id);
    obj['quantity'] = quantityParam;

    setCart({
      products: newProducts,
    });

    localStorage.setItem(
      'cart',
      JSON.stringify({
        products: newProducts,
      })
    );
    console.log(cart);
  };

  const valueCart = {
    cart,
    handleAddCartProduct,
    handleDeleteCartProduct,
    handleNewQuantity,
    handleCleanCart
  };

  useEffect(() => {
    //se carga de local storage el carrito y el usuario
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  console.log(cart);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={valueUser}>
        <CartContext.Provider value={valueCart}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/categories" element={<CategoriesList />} />
                <Route
                  path="/categories/:id/products"
                  element={<ProductsList url={'/categories/'} />}
                />
                <Route
                  path="/categories/add"
                  element={
                    <ProtectedRoute>
                      <CategoryAdd />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/categories/edit"
                  element={
                    <ProtectedRoute>
                      <CategoryEditList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/categories/edit/:id"
                  element={
                    <ProtectedRoute>
                      <CategoryEdit />
                    </ProtectedRoute>
                  }
                />
                <Route path="/products" element={<ProductsList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route
                  path="/products/add"
                  element={
                    <ProtectedRoute>
                      <ProductAdd />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/edit"
                  element={
                    <ProtectedRoute>
                      <ProductEditList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/edit/:id"
                  element={
                    <ProtectedRoute>
                      <ProductEdit />
                    </ProtectedRoute>
                  }
                />
                <Route path="/cart-detail" element={<CartDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NoMatch />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
export default App;

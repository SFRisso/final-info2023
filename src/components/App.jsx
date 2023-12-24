import '../styles/App.css'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext.jsx';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Layout from './layout/Layout.jsx'
import Home from './Home.jsx'
import CategoriesList from './categories/CategoriesList.jsx'
import CategoryAdd from './categories/CategoryAdd.jsx'
import CategoryEdit from './categories/CategoryEdit.jsx'
import ProductsList from './products/ProductsList.jsx'
import ProductDetail from './products/ProductDetail.jsx'
import ProductAdd from './products/ProductAdd.jsx'
import ProductEdit from './products/ProductEdit.jsx'
import CartDetail from './cart/CartDetail.jsx'
import Login from './login-register/Login.jsx'
import Register from './login-register/Register.jsx'
import ProtectedRoute from './ProtectedRoute.jsx';
import NoMatch from './NoMatch.jsx'

function App() {
  const queryClient = new QueryClient()
  
  //Auth context
  const [user, setUser] = useState({
    id: '',
    user: '',
    admin: false
  });

  const handleLogin = (name, admin) =>{
    setUser({
      name,
      admin
    });

    localStorage.setItem('user', JSON.stringify({
      name,
      admin
    }));
  }

  const handleLogout = () =>{
    setUser({
      name: '',
      admin: false
    });
    localStorage.removeItem('user');
  }

  const valueUser = {
    user,
    handleLogin,
    handleLogout,
  };

  //Cart context
  const [cart, setCart] = useState({
    products: [],
  });

  const handleAddCartProduct = (product, quantityParam, image) =>{
    
    let newProducts = [...cart.products];
    const obj = newProducts.find(p => p.id === product.id);

    if (obj) { //si ya existe el producto en carrito
      obj['quantity'] = obj['quantity'] + quantityParam;
      console.log('ya existe producto')
      console.log(newProducts)
    } else{ //si no existe
      let myProduct = {
        id: product.id,
        title: product.title,
        image: image,
        description: product.description,
        price: product.price,
        quantity: quantityParam,
      }
      newProducts = [...newProducts, myProduct];
    }

    setCart({
        products: newProducts,
    });

    console.log(cart)

    localStorage.setItem('cart', JSON.stringify({
        products: newProducts,
    }));
  }
  
  const handleDeleteCartProduct = (id) => {
    const newProducts = cart.products.filter((product) => product.id != id);

    setCart({
      products: newProducts,
    });

    localStorage.setItem('cart', JSON.stringify({
      products: newProducts,
    }));
  }

  const handleNewQuantity = (id, quantityParam) => {
    let newProducts = [...cart.products];
    const obj = newProducts.find(p => p.id === id);
    obj['quantity'] = quantityParam;

    setCart({
      products: newProducts,
    });

    localStorage.setItem('cart', JSON.stringify({
      products: newProducts,
    }));
    console.log(cart)
  }

  const valueCart = {
    cart,
    handleAddCartProduct,
    handleDeleteCartProduct,
    handleNewQuantity
  };

 useEffect(() => {
  //se carga de local storage el carrito y el usuario 
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
  const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  console.log(cart)

  return (
    <QueryClientProvider client={queryClient}>
    <AuthContext.Provider value={valueUser}>
    <CartContext.Provider value={valueCart}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<Home/>}/>
        <Route path="/categories" element={<CategoriesList/>}/>
        <Route path="/categories/:id/products" element={<ProductsList url={'/categories/'}/>}/>
        <Route path="/categories/add" element={
          <ProtectedRoute>
            <CategoryAdd/>
          </ProtectedRoute>
        }/>
        <Route path="/categories/edit" element={
          <ProtectedRoute>
            <CategoryEdit/>
          </ProtectedRoute>
        }/>
        <Route path="/products" element={<ProductsList/>}/>
        <Route path="/products/:id" element={
            <ProductDetail/>
          }/>
        <Route path="/products/add" element={
          <ProtectedRoute>
            <ProductAdd/>
          </ProtectedRoute>
        }/>
        <Route path="/products/edit" element={
          <ProtectedRoute>
            <ProductEdit/>
          </ProtectedRoute> 
        }/>
        <Route path="/cart-detail" element={<CartDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<NoMatch/>}/>
       </Route>
    </Routes>
    </BrowserRouter> 
    </CartContext.Provider>
    </AuthContext.Provider>
    </QueryClientProvider>
  )
}
export default App


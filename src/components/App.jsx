import '../styles/App.css'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
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
import { CartContext } from '../context/CartContext.jsx';


function App() {
  
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
    })

    localStorage.setItem('user', JSON.stringify({
      name,
      admin
    }))
  }

  const handleLogout = () =>{
    setUser({
      name: '',
      admin: false
    })
    localStorage.removeItem('user');
  }

  const value = {
    user,
    handleLogin,
    handleLogout,
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);





  return (
    <AuthContext.Provider value={value}>
    <CartContext>
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
    </CartContext>
    </AuthContext.Provider>  
  )
}
export default App


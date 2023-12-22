import '../styles/App.css'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Home from './Home.jsx'
import CategoriesList from './categories/CategoriesList.jsx'
import CategoryAdd from './categories/CategoryAdd.jsx'
import CategoryEdit from './categories/CategoryEdit.jsx'
import ProductsList from './products/ProductsList.jsx'
import ProductDetail from './products/ProductDetail.jsx'
import ProductAdd from './products/ProductAdd.jsx'
import ProductEdit from './products/ProductEdit.jsx'
import CartDetail from './cart/Cart.jsx'
import Login from './login-register/Login.jsx'
import Register from './login-register/Register.jsx'
import NoMatch from './NoMatch.jsx'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<Home/>}/>
        <Route path="/categories" element={<CategoriesList/>}/>
        <Route path="/categories/add" element={<CategoryAdd/>}/>
        <Route path="/categories/edit" element={<CategoryEdit/>}/>
        <Route path="/products" element={<ProductsList/>}/>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/products/add" element={<ProductAdd/>}/>
        <Route path="/products/edit" element={<ProductEdit/>}/>
        <Route path="/cart-detail" element={<CartDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<NoMatch/>}/>
       </Route>
    </Routes>
    </BrowserRouter>   
  )
}
export default App


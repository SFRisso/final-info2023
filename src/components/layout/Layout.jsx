import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import { Container } from 'react-bootstrap'

function Layout() {
    return ( <>
        <NavigationBar/>
        <Container><Outlet /></Container>
        <Footer/>
    </> 
    );
}

export default Layout;
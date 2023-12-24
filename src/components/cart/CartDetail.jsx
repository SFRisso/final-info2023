import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Row, Col, Card, Button } from 'react-bootstrap';
import styles from '../../styles/Card.module.css';
import CartItem from './CartItem.jsx';

function CartDetail() {
    const { cart } = useContext(CartContext);
    const totalQuantity = cart.products.reduce((accumulator, product) => {
        return  accumulator + product.quantity;
      }, 0);

    const totalPrice = cart.products.reduce((accumulator, product) => {
        return  accumulator + (product.quantity * product.price)
      }, 0);

    
    return ( 
        <>
        <p className="display-4 fw-bold text-center">Carrito</p>
        <div className={styles.wrapper}>
        <Row className="gy-3">
        <Col className="col-12 col-lg-4">
            <Card className="p-0 bg-primary-subtle" border="primary">
            <Card.Body>
                <Card.Title className="px-2 pt-2 text-center  display-5 fw-medium">
                    Checkout
                </Card.Title>   
                <Card.Text className="px-2 pt-2 text-center fw-medium">
                    Cantidad de productos: {totalQuantity}
                </Card.Text>
                <Card.Text className="px-2 pt-2 text-center fw-medium">
                    PrecioTotal: ${totalPrice}
                </Card.Text>
                <div className="d-grid">
                    <Button variant="primary" size="lg">
                        Comprar                    
                    </Button>
                </div>
            </Card.Body>
            </Card>
        </Col>
        <Col className="col-12 col-lg-8">
        {cart.products.map ((product) =>(
            <CartItem 
            key={product.id}
            id={product.id} 
            title={product.title} 
            price={product.price} 
            description={product.description}
            image={product.image}
            quantity={product.quantity}
            priceTotal={product.priceTotal}
            />
        )) }
        </Col>
        </Row>   
        </div>
        </>
     );
}

export default CartDetail;
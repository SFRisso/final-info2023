import { Card, Col, Button} from 'react-bootstrap'
import { CartPlus } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';

function ProductCard({id, title, price, description, image, category}) {
    return (
            <Col>
            <Card className='h-100'>
                <Card.Img variant="top" src={image} />
                <Card.Body className="d-flex flex-column">
                <Card.Title className="link-primary link-offset-2 link-underline-opacity-75 link-underline-opacity-100-hover fw-bold" as={Link} to={`/products/${id}`}>{title}</Card.Title>
                    <span className="fw-bold text-dark">${price}</span>
                    <Card.Text className="fw-bold text-success">
                    {category}
                    </Card.Text>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button variant="dark" className="mt-auto">
                        <CartPlus color="white" size={30}/> 
                    </Button>            
                </Card.Body>
            </Card>
          </Col>

     );
}

export default ProductCard;
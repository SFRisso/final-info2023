import { API_URL } from '../../constants/api';
import useFetchData from '../../hooks/useFetchData'
import { Card, Spinner, Placeholder } from 'react-bootstrap'
import ProductCard from './ProductCard'

function ProductsList() {
    const {
        data: products,
        error,
        isLoading,
    } = useFetchData(API_URL + '/products');

    if (isLoading) {
        return(
        <Card style={{ width: '18rem' }}>
      <div className="text-center m-5">
         <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
        </div>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
        );
    } 

    if (error){
        <h1>{error}</h1>;
    }

    console.log(products);
    return ( <>
        
    <h1>Productos</h1>
    {products.map ((product) =>(
        <ProductCard key={product.id} title={product.title}/>
    )) }
    </> );
}

export default ProductsList;
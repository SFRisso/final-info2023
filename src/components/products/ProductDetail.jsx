import { API_URL } from '../../constants/api';
import useFetchData from '../../hooks/useFetchData'
import{ useParams } from 'react-router-dom';
import { Button} from 'react-bootstrap'
import { CartPlus } from "react-bootstrap-icons";

function ProductDetail() {
  const { id } = useParams();
  const {
    data: product,
    error,
    isLoading,
  } = useFetchData(API_URL + '/products/' + id);

  if (isLoading) {
    return(
        <>
        <p className="fs-1 text-center">Cargando...</p>

        </>
    );
  } 

  if (error){
    return (        
    <h1>Error: {error}</h1>
    );
  }
  console.log(product)

  return (
    <>
    <p className="fs-1 text-center">Detalle de Producto</p>
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-8">
          <div className="row mb-2">
            <div className="container mx-auto px-4">
              {product.images ? 
                product.images.map ((img) =>(
              <img key={self.crypto.randomUUID()} src={img} height="250"></img>  
              )) 
              : <p>cargando</p> }
            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline me-2">{product.title}</h1>
              <div className="mb-1">
                <span className="fw-bold h5 me-2">${product.price}</span>
              </div>  
          </div>
          </div>
            </div>
            <div>
                <p className="fw-bold mb-2 small">Descripcíon</p>
                <p>{product.description}</p>
              </div>
            <div className="mb-3">
                <div className="d-inline float-start me-2">
                  <div className="input-group input-group-sm ">
                    <Button className="btn btn-dark text-white" type="button">
                    -
                    </Button>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="1"
                    />
                    <button
                      className="btn btn-dark text-white"
                      type="button">
                    +
                    </button>
                  </div>
                </div>
                <Button variant="dark" className="" size="sm">
                        <CartPlus color="white" size={20}/> Agregar al Carrito 
                </Button>  
              </div>
              
          </div>
          </div>
  </>
  );
}

export default ProductDetail;
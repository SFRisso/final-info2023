import { API_URL } from '../../constants/api';
import useFetchData from '../../hooks/useFetchData';
import { Row } from 'react-bootstrap';
import CategoryCard from './CategoryCard';
import CategoryCardPlaceholder from './CategoryCardPlaceholder';
import styles from '../../styles/Card.module.css';

function CategoriesList() {
  const {
    data: categories,
    error,
    isLoading,
  } = useFetchData(API_URL + '/categories');

  if (isLoading) {
    return (
      <>
        <p className="fs-1 text-center">Cargando...</p>
        <div className={styles.wrapper}>
          <Row xs={1} sm={2} md={3} lg={4} xl={5} className="gy-3">
            {Array.from({ length: 10 }).map(() => (
              <CategoryCardPlaceholder key={self.crypto.randomUUID()} />
            ))}
          </Row>
        </div>
      </>
    );
  }

  if (error) {
    return <p className="fs-1 text-center">Error: {error}</p>;
  }

  if (!categories) {
    return (
      <>
        <p className="fs-1 text-center">Categories</p>
        <div className={styles.wrapper}>No hay categorías.</div>
      </>
    );
  }

  return (
    <>
      {categories.length > 0 ? (
        <p className="fs-1 text-center"> Categorías </p>
      ) : (
        <p className="fs-1 text-center"> No hay categorías. </p>
      )}
      <div className={styles.wrapper}>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="gy-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
            />
          ))}
        </Row>
      </div>
    </>
  );
}

export default CategoriesList;

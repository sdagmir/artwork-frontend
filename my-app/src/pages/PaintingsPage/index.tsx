import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navbar } from '../../components/Navbar';
import { Cart } from '../../components/Cart';
import { PaintingCard } from '../../components/PaintingCard';
import { FC } from 'react';
import { Breadcrumbs } from '../../components/BreadCrumbs';
import { useChemicalCatalogPage } from './usePaintingsPage';

export const PaintingsPage: FC = () => {
  const {
    paintingsList,
    expertiseId,
    itemsInCart,
    handleSearchPaintingClick,
    handleSearchTitleChange,
  } = useChemicalCatalogPage();

  return (
    <>
      <Navbar />
      <Container className="pb-4 d-flex flex-column mx-auto" style={{ maxWidth: '1200px' }}>
        <Container className="d-flex flex-row justify-content-between mb-5 mt-5">
          <Breadcrumbs endItem="Каталог" />
          <Cart paintingExpertiseId={expertiseId} itemsInCart={itemsInCart} />
        </Container>
        <div className="d-flex flex-row gap-3 mb-4 col-8 align-self-center">
          <div className="flex-grow-1">
            <input
              type="text"
              className="input form-control"
              onChange={handleSearchTitleChange}
              placeholder="Поиск картины"
              aria-label="Поиск"
            />
          </div>
          <div>
            <Button
              onClick={handleSearchPaintingClick}
              className="btn btn-secondary ml-3 mr-3"
            >
              Искать
            </Button>
          </div>
        </div>
        <Row xs={1} sm={1} lg={3} className="g-4 justify-content-start">
          {paintingsList.map((paintingDetail) => (
            <Col key={paintingDetail.id} className="d-flex align-items-stretch">
              <PaintingCard key={paintingDetail.id} {...paintingDetail} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default PaintingsPage;

import { FC } from "react";
import { Navbar } from "../../components/Navbar";
import { Container } from "react-bootstrap";
import "./MainPage.css";

export const MainPage: FC = () => {
  return (
    <>
      <Navbar />
      <Container fluid className="d-flex justify-content-center align-items-center vh-100">
        <div className="intro">
          <h1>Картины для экспертиз</h1>
          <p>
            Подлинность, история и ценность картин, подтвержденные профессиональными методами и исследованиями.
          </p>
          <p>
            Детальный анализ произведений искусства для экспертных заключений и оценок.
          </p>
        </div>
      </Container>
    </>
  );
};
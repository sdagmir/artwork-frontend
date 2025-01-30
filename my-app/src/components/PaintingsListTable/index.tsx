import { FC } from "react";
import { IPaintingsTableProps } from "./typing";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PaintingsListTable: FC<IPaintingsTableProps> = ({ rows }) => {
  return (
    <div>
      {/* Заголовок таблицы */}
      <Card className="mb-2">
        <Card.Body className="py-2 px-3">
          <Row className="d-flex align-items-center" style={{ fontSize: "14px" }}>
            <Col xs={12} sm={1} className="text-center">
              <strong>ID</strong>
            </Col>
            <Col xs={12} sm={3} className="text-center">
              <strong>Название</strong>
            </Col>
            <Col xs={12} sm={5} className="text-center">
              <strong>Описание</strong>
            </Col>
            <Col xs={12} sm={3} className="text-center">
              <strong>Путь к изображению</strong>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Строки таблицы */}
      {rows.map((row) => (
        <Card key={row.pk} className="mb-2">
          <Card.Body className="py-2 px-3">
            <Row className="d-flex align-items-center" style={{ fontSize: "14px" }}>
              <Col xs={12} sm={1} className="text-center">
                <Link to={`/paintings-list/${row.pk}`} className="text-dark text-decoration-none">
                  {row.pk}
                </Link>
              </Col>
              <Col xs={12} sm={3} className="text-center">
                <span>{row.title}</span>
              </Col>
              <Col xs={12} sm={5} className="text-center">
                <span>{row.shortDescription}</span>
              </Col>
              <Col xs={12} sm={3} className="text-center">
                  <span>{row.imgPath}</span>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

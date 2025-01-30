import { FC } from "react";
import { IExpertiseTableProps } from "./typing";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ExpertiseListTable.css";
import qr_icon from "/images/qr-icon.jpg";
import time from "/images/time.jpg";


export const ExpertiseListTable: FC<IExpertiseTableProps> = ({ rows }) => {
  return (
    <div>
      {/* Заголовок таблицы */}
      <Card className="mb-2">
        <Card.Body className="py-2 px-3">
          <Row className="d-flex align-items-center" style={{ fontSize: "14px" }}>
            <Col xs={12} sm={1} className="text-center no-wrap">
              <Card.Text>
                <strong>№</strong>
              </Card.Text>
            </Col>
            <Col xs={12} sm={2} className="text-center no-wrap">
              <Card.Text>
                <strong>Автор</strong>
              </Card.Text>
            </Col>
            <Col xs={12} sm={2} className="text-center no-wrap">
              <Card.Text>
                <strong>Статус</strong>
              </Card.Text>
            </Col>
            <Col xs={12} sm={2} className="text-center no-wrap">
              <Card.Text>
                <strong>Создано</strong>
              </Card.Text>
            </Col>
            <Col xs={12} sm={2} className="text-center no-wrap">
              <Card.Text>
                <strong>Завершено</strong>
              </Card.Text>
            </Col>
            <Col xs={12} sm={2} className="text-center no-wrap">
              <Card.Text>
                <strong>Результат</strong>
              </Card.Text>
            </Col>
            <Col xs={12} sm={1} className="text-center no-wrap">
              <Card.Text>
                <strong>QR</strong>
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Строки таблицы */}
      {rows.map((row) => (
        <Card key={row.number} className="mb-2">
          <Card.Body className="py-2 px-3">
            <Row className="d-flex align-items-center" style={{ fontSize: "14px" }}>
              <Col xs={12} sm={1} className="text-center">
                <Card.Text>
                  <Link to={`/expertise/${row.number}`} className="text-dark text-decoration-none">
                    {row.number}
                  </Link>
                </Card.Text>
              </Col>
              <Col xs={12} sm={2} className="text-center">
                <Card.Text>{row.author}</Card.Text>
              </Col>
              <Col xs={12} sm={2} className="text-center">
                <Card.Text>{row.status}</Card.Text>
              </Col>
              <Col xs={12} sm={2} className="text-center">
                <Card.Text>{row.creationDate}</Card.Text>
              </Col>
              <Col xs={12} sm={2} className="text-center">
                <Card.Text>{row.completionDate || "---"}</Card.Text>
              </Col>
              <Col xs={12} sm={2} className="text-center">
                <Card.Text>{row.result ? "✅" : "❌"}</Card.Text>
              </Col>
              <Col xs={1} className="text-center">
                {row.qr ? (
                  <div className="qr-hover-wrapper">
                    <img className="status-icon" src={qr_icon} alt="QR Icon" />
                    <div className="qr-hover">
                      <img className="qr-code" src={`data:image/png;base64,${row.qr}`} alt="QR Code" />
                      <p>Сканируй</p>
                    </div>
                  </div>
                ) : (
                  <img className="status-icon" src={time} alt="В процессе" />
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

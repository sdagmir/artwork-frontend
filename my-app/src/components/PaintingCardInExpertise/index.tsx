import { FC, useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { ExpertiseComponent } from "../../core/api/API";
import placeholderImage from "/images/image_placeholder.jpg";
import binImage from "/images/bin.jpg";

interface PaintingCardInExpertiseProps {
  painting: ExpertiseComponent;
  onDelete: (pk: number) => void;
  onCommentChange: (pk: number, comment: string) => void;
  isEditMode: boolean;
}

export const PaintingCardInExpertise: FC<PaintingCardInExpertiseProps> = ({
  painting,
  onDelete,
  onCommentChange,
  isEditMode,
}) => {
  const [comment, setComment] = useState<string>(painting.comment || "");

  useEffect(() => {
    onCommentChange(painting.painting.id!, comment);
  }, [comment]);

  return (
    <div className="position-relative mb-3">
      <Card className="border-2" style={{ borderColor: "#DEE2E6" }}>
        <Card.Body>
          <Row>
            <Col xs={3}>
              <div style={{ height: "130px" }}>
                <img
                  src={painting.painting.img_path || placeholderImage}
                  alt={painting.painting.title}
                  className="rounded-1 img-fluid h-100 w-100 object-fit-cover"
                />
              </div>
            </Col>
            <Col xs={9}>
              <h3 className="mb-3">{painting.painting.title}</h3>
              <p className="text-muted">{painting.painting.description}</p>

              {/* Поле ввода комментария */}
              <Form.Group className="mt-3">
                <Form.Label className="fw-bold">Комментарий</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Добавьте комментарий..."
                  className="border-2"
                  style={{
                    borderColor: "#DEE2E6",
                    resize: "none",
                  }}
                  disabled={!isEditMode} // Блокировка в режиме просмотра
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Кнопка удаления */}
      {isEditMode && (
        <Button
          variant="link"
          className="position-absolute top-50 translate-middle-y"
          style={{ right: "-70px" }}
          onClick={() => onDelete(painting.painting.id!)}
        >
          <img src={binImage} alt="Удалить" style={{ width: "50px" }} />
        </Button>
      )}
    </div>
  );
};

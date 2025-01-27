import { FC } from "react";
import { IPaintingProps } from "./typing";
import { Card } from "react-bootstrap";
import "./PaintingCard.css";
import { Link } from "react-router-dom";

export const PaintingCard: FC<IPaintingProps> = (paintingCard: IPaintingProps) => {
  return (
    <Card className="provider-card w-100 rounded-4 shadow-sm" style={{ overflow: "hidden" }}>
      <Link to={`/paintings/${paintingCard.id}`} style={{ textDecoration: "none" }}>
        <Card.Img
          variant="top"
          src={paintingCard.img_path}
          className="provider-card-img"
          alt={paintingCard.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/image_placeholder.jpg';
          }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="provider-card-title">{paintingCard.title}</Card.Title>
        <Card.Text className="provider-card-description">
          {paintingCard.short_description}
        </Card.Text>
        <button className="custom-button mt-auto">Добавить</button>
      </Card.Body>
    </Card>
  );
};

export default PaintingCard;

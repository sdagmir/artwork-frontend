import { FC } from "react";
import { IPaintingProps } from "./typing";
import { Card } from "react-bootstrap";
import "./PaintingCard.css";
import { Link } from "react-router-dom";
import placeholderImage from "/images/image_placeholder.jpg";
import { dest_img, target_tauri } from "../../../target_config";

export const PaintingCard: FC<IPaintingProps> = (paintingCard: IPaintingProps) => {

  const imagePath = target_tauri
    ? `${dest_img}${paintingCard.img_path}`
    : paintingCard.img_path || placeholderImage;

  return (
    <Card className="provider-card w-100 rounded-4 shadow-sm" style={{ overflow: "hidden" }}>
      <Link to={`/paintings/${paintingCard.pk}`} style={{ textDecoration: "none" }}>
        <Card.Img
          variant="top"
          src={imagePath}
          className="provider-card-img"
          alt={paintingCard.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== placeholderImage) {
              target.src = placeholderImage;
            }
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

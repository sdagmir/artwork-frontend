import { FC } from "react";
import { IPaintingProps } from "./typing";
import { Card } from "react-bootstrap";
import "./PaintingCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import placeholderImage from "/images/image_placeholder.jpg";
import { api } from "../../core/api";
import { incrementItemsInCart } from "../../core/store/slices/appSlice";
import { setExpertiseId } from "../../core/store/slices/appSlice";

export const PaintingCard: FC<IPaintingProps> = (paintingCard: IPaintingProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 
  const { isAuth } = useAppSelector((state) => state.user);
  const { expertiseId } = useAppSelector((state) => state.app)

  const handleAddToCart = async () => {
    if (!isAuth) {
        console.log("Пользователь не авторизован. Пожалуйста, выполните вход.");
        alert("Вы должны авторизоваться, чтобы добавить картину в корзину.");
        navigate("/login");
        return;
    }
    try {
        const response = await api.paintings.paintingsAddCreate(String(paintingCard.pk));

        if (response.status === 200) {
            console.log("Картина добавлена в корзину.");

            if (!expertiseId && response.data.expertise_id) {
              dispatch(setExpertiseId(response.data.expertise_id));
              console.log("🔄 Обновлен expertiseId:", response.data.expertise_id);
          }

            dispatch(incrementItemsInCart());
        }
    } catch (error) {
        console.error("Ошибка добавления картины в корзину:", error);
        alert("Эта картина уже добавлена в корзину!");
    }
  };

  return (
    <Card className="provider-card w-100 rounded-4 shadow-sm" style={{ overflow: "hidden" }}>
      <Link to={`/paintings/${paintingCard.pk}`} style={{ textDecoration: "none" }}>
        <Card.Img
          variant="top"
          src={paintingCard.img_path}
          className="provider-card-img"
          alt={paintingCard.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="provider-card-title">{paintingCard.title}</Card.Title>
        <Card.Text className="provider-card-description">
          {paintingCard.short_description}
        </Card.Text>
        <button 
          onClick={handleAddToCart}
          className="custom-button mt-auto">
            Добавить
        </button>
      </Card.Body>
    </Card>
  );
};

export default PaintingCard;

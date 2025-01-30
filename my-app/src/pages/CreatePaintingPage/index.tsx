import { useEffect, useState } from "react"
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../../core/api";
import { Breadcrumbs } from "../../components/BreadCrumbs";
import { Navbar } from "../../components/Navbar";
import { useAppSelector } from "../../core/store/hooks";

export const CreatePaintingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, username } = useAppSelector((state) => state.user);

  // Стейты для полей формы
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuth || username !== "admin") {
      navigate("/forbidden");
    }
  }, [isAuth, username, navigate]);

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !shortDescription.trim() || !description.trim() || !imgPath.trim()) {
      setError("Все поля должны быть заполнены!");
      return;
    }

    try {
      await api.paintings.paintingsCreate({
        title,
        short_description: shortDescription,
        description,
        img_path: imgPath,
      });

      navigate("/paintings"); // Перенаправление на список картин
    } catch (error) {
      console.error("❌ Ошибка при создании картины:", error);
      setError("Ошибка при создании картины. Проверьте корректность данных.");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-4 ms-3">
        <Breadcrumbs
          middleItems={[{ name: "Каталог", link: "/paintings" }, { name: "Список картин", link: "/paintings-list" }]}
          endItem="Добавить картину"
        />
      </Container>

      <Container style={{ maxWidth: "600px" }}>
        <h2 className="mt-4 text-center">Добавить новую картину</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Название картины</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название картины"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Краткое описание</Form.Label>
            <Form.Control
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Введите краткое описание"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Полное описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите полное описание картины"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ссылка на изображение</Form.Label>
            <Form.Control
              type="text"
              value={imgPath}
              onChange={(e) => setImgPath(e.target.value)}
              placeholder="Введите URL изображения"
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{ 
                backgroundColor: "#a26907", 
                borderColor: "#a26907",
                color: "#fff", }}
          >
            Добавить картину
          </Button>
        </Form>
      </Container>
    </>
  );
};

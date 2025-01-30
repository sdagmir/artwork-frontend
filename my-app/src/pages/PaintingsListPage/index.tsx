import { Container, Button } from "react-bootstrap";
import { useEffect } from "react";
import { PaintingsListTable } from "../../components/PaintingsListTable";
import { usePaintingsListPage } from "./usePaintingsListPage";
import { Navbar } from "../../components/Navbar";
import { Breadcrumbs } from "../../components/BreadCrumbs";
import { useAppSelector } from "../../core/store/hooks";
import { useNavigate } from "react-router-dom";

export const PaintingsListPage: React.FC = () => {
  const { tableProps, searchListTitle, handleSearchChange } = usePaintingsListPage();
  const navigate = useNavigate();
  const { isAuth, username } = useAppSelector((state) => state.user);
  
    useEffect(() => {
      if (!isAuth || username !== "admin") {
        navigate("/forbidden");
      }
    }, [isAuth, username, navigate]);

  return (
    <>
      <Navbar />
      <Container className="mt-4 ms-3">
        {/* Breadcrumbs (хлебные крошки) */}
        <Breadcrumbs
          middleItems={[{ name: "Каталог", link: "/paintings" }]}
          endItem="Список картин"
        />
      </Container>

      <Container style={{ maxWidth: "1400px" }}>
        <h1 className="m-4 text-center">Список картин</h1>

        <div className="d-flex justify-content-end mb-3">
          <Button
            onClick={() => navigate("/create-painting")}
            style={{
                backgroundColor: "#a26907", 
                borderColor: "#a26907",
                color: "#fff",
            }}
          >
            Добавить картину
          </Button>
        </div>

        {/* Поле для поиска */}
        <div className="d-flex justify-content-center mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Введите название картины..."
            value={searchListTitle}
            onChange={handleSearchChange}
          />
        </div>

        <div className="m-4">
          <PaintingsListTable {...tableProps} />
        </div>
      </Container>
    </>
  );
};

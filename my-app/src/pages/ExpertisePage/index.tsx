import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { PaintingCardInExpertise } from "../../components/PaintingCardInExpertise";
import { useExpertisePage } from "./useExpertisePage";
import { Breadcrumbs } from "../../components/BreadCrumbs";
import { useAppSelector } from "../../core/store/hooks";
import { useNavigate } from "react-router-dom";

export const ExpertisePage: React.FC = () => {
  const {
    paintingsList,
    expertiseId,
    author,
    notification,
    handleDeletePainting,
    handleSaveExpertiseName,
    handleCreateExpertise,
    handleClearExpertise,
    handlePaintingCommentChange,
    handleExpertiseAuthorChange,
  } = useExpertisePage();

  const draftExpertiseId = useAppSelector((state) => state.app.expertiseId); // ID черновика из глобального состояния
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate("/forbidden");
    }
  }, [isAuth, navigate]);

  // Определяем режим редактирования
  const isEditMode = expertiseId === String(draftExpertiseId);

    console.log("paintingsList в ExpertisePage:", paintingsList);
    console.log("expertiseId в ExpertisePage:", expertiseId);
    console.log("author в ExpertisePage:", author);

  return (
    <>
      <Navbar />
      <Container fluid className="pt-4">
        <Container className="mt-4" style={{ maxWidth: "1200px" }}>
          <Breadcrumbs
            middleItems={[
              {
                name: "Каталог картин",
                link: "/paintings",
              },
            ]}
            endItem={"Экспертиза № " + expertiseId}
          />
        </Container>

        <div className="position-relative mt-5">
          <div className="mx-auto" style={{ width: "950px" }}>
            <h1 className="text-center mb-4">
              {isEditMode ? "Создание экспертизы" : "Просмотр экспертизы"}
            </h1>

            {notification && (
              <p
                className="text-center mb-4"
                style={{ fontSize: "1.2rem", color: "red" }}
              >
                {notification}
              </p>
            )}

            {isEditMode && (
              <Form onSubmit={(e) => e.preventDefault()} className="mb-4">
                <Row className="g-2">
                  <Col md={12}>
                    <Form.Floating>
                      <Form.Control
                        id="expertiseAuthor"
                        type="text"
                        className="border-2"
                        value={author}
                        onChange={(e) =>
                          handleExpertiseAuthorChange(e.target.value)
                        }
                        required
                      />
                      <label htmlFor="expertiseAuthor">Автор экспертизы</label>
                    </Form.Floating>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    className="btn-sm rounded-2 fw-bold"
                    style={{
                      backgroundColor: "#A26907",
                      borderColor: "#A26907",
                      color: "#ffffff",
                      transition: "transform 550ms",
                    }}
                    onClick={handleSaveExpertiseName}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    Сохранить автора
                  </Button>
                </div>
              </Form>
            )}

            <div className="mb-4">
              {paintingsList.map((painting) => (
                <PaintingCardInExpertise
                  key={painting.painting.id}
                  painting={painting}
                  onDelete={handleDeletePainting}
                  onCommentChange={handlePaintingCommentChange}
                  isEditMode={isEditMode}
                />
              ))}

              {isEditMode && (
                <div className="d-flex justify-content-between gap-2 mt-4">
                  <Button
                    className="btn-lg rounded-2 fw-bold"
                    style={{
                      backgroundColor: "#A26907",
                      borderColor: "#A26907",
                      color: "#ffffff",
                      transition: "transform 550ms",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                    onClick={handleClearExpertise}
                  >
                    Удалить
                  </Button>
                  <Button
                    className="btn-lg rounded-2 fw-bold"
                    style={{
                      backgroundColor: "#A26907",
                      borderColor: "#A26907",
                      color: "#ffffff",
                      transition: "transform 550ms",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                    onClick={handleCreateExpertise}
                  >
                    Завершить экспертизу
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

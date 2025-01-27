import { FC, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Button, Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { IPaintingDetail } from "../../core/api/service/typing";
import { getPaintingById } from "../../core/api/service";
import { paintingList as PAINTINGS_LIST_MOCK } from "../../core/mock/chemicalElementList";
import { Breadcrumbs } from "../../components/BreadCrumbs";

export const ChemicalElementPage: FC = () => {
    const { id } = useParams();
    const [paintingDetailData, setPaintingDetailData] = useState<IPaintingDetail | null>(null);

    useEffect(() => {
        if (id) {
            getPaintingById(id)
                .then((data) => {
                    console.log("Полученные данные:", data);
                    setPaintingDetailData(data);
                })
                .catch(() => {
                    const painting = PAINTINGS_LIST_MOCK.find(
                        (element) => element.id === Number(id)
                    );
                    setPaintingDetailData(painting || null);
                });
        }
    }, [id]);

    if (!paintingDetailData) {
        return (
            <>
                <Navbar />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Container className="mt-4 ms-3">
                <Breadcrumbs
                    middleItems={[
                        {
                            name: "Каталог",
                            link: "/paintings",
                        },
                    ]}
                    endItem={paintingDetailData.title}
                />
            </Container>

            <Container
                fluid
                className="mt-5 pb-4 d-flex flex-column align-items-center mx-auto"
            >
                <Card
                    className="col-5 rounded-4 shadow-sm"
                    style={{
                        overflow: "hidden",
                        border: "3px solid #F4F4F4",
                    }}
                >
                    <Card.Img
                        variant="top"
                        src={paintingDetailData.img_path}
                        style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "cover",
                        }}
                    />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title
                            className="text-center fw-bold"
                            style={{
                                color: "#A26907",
                                fontSize: "1.8rem",
                            }}
                        >
                            {paintingDetailData.title}
                        </Card.Title>
                        <Card.Text
                            className="fw-medium mb-4"
                            style={{
                                color: "#333333",
                                fontSize: "1rem",
                                lineHeight: "1.6",
                            }}
                            dangerouslySetInnerHTML={{
                                __html: paintingDetailData.description,
                            }}
                        ></Card.Text>
                        <div className="mt-auto d-flex justify-content-between">
                            <Button
                                className="w-100 btn-lg"
                                style={{
                                    transition: "transform 0.3s ease, background-color 0.3s ease",
                                    backgroundColor: "#A26907",
                                    borderColor: "#A26907",
                                    color: "#ffffff",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "#824F23")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "#A26907")
                                }
                            >
                                Добавить
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default ChemicalElementPage;


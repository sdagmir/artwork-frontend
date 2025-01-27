import { FC, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Button, Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { IPaintingDetail } from "../../core/api/service/typing";
import { getPaintingById } from "../../core/api/service";
import { paintingList as PAINTINGS_LIST_MOCK } from "../../core/mock/chemicalElementList";
import { Breadcrumbs } from "../../components/BreadCrumbs";
import placeholderImage from "/images/image_placeholder.jpg";

export const PaintingDetailPage: FC = () => {
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
                className="mt-5 pb-4 d-flex flex-column align-items-center mx-auto px-3"
            >
                <Card
                    className="col-12 col-md-8 col-lg-6 rounded-4 shadow-sm"
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
                            height: "auto",
                            objectFit: "cover",
                            maxHeight: "400px",
                        }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = placeholderImage;
                        }}
                    />
                    <Card.Body className="d-flex flex-column p-3 p-md-4">
                        <Card.Title
                            className="text-center text-md-start fw-bold"
                            style={{
                                color: "#A26907",
                                fontSize: "1.8rem",
                            }}
                        >
                            {paintingDetailData.title}
                        </Card.Title>
                        <Card.Text
                            className="fw-medium mb-4 text-center text-md-start"
                            style={{
                                color: "#333333",
                                fontSize: "1rem",
                                lineHeight: "1.6",
                            }}
                            dangerouslySetInnerHTML={{
                                __html: paintingDetailData.description,
                            }}
                        ></Card.Text>
                        <div className="mt-auto d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                            <Button
                                className="btn-lg w-100 w-md-50"
                                style={{
                                    transition: "transform 0.3s ease, background-color 0.3s ease",
                                    backgroundColor: "#A26907",
                                    borderColor: "#A26907",
                                    color: "#ffffff",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = "#824F23")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = "#A26907")
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

export default PaintingDetailPage;

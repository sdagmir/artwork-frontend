import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { FiltersForExpertise } from "../../components/FiltersForExpertise";
import { ExpertiseListTable } from "../../components/ExpertiseListTable";
import { useExpertiseListPage } from "./useExpertiseListPage";
import { Navbar } from "../../components/Navbar";
import { useAppSelector } from "../../core/store/hooks";
import { useNavigate } from "react-router-dom";

export const ExpertiseListPage: React.FC = () => {
  const { tableProps, filterProps } = useExpertiseListPage();
  const { isAuth } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/forbidden");
    }
  }, [isAuth, navigate]);

  return (
    <>
      <Navbar />
      <Container style={{ maxWidth: "1400px" }}>
        <h1 className="m-4 text-center">Список экспертиз</h1>
        <FiltersForExpertise {...filterProps} />
        <div className="m-4">
          <ExpertiseListTable {...tableProps} />
        </div>
      </Container>
    </>
  );
};

import { Container } from "react-bootstrap";
import { FiltersForExpertise } from "../../components/FiltersForExpertise";
import { ExpertiseListTable } from "../../components/ExpertiseListTable";
import { useExpertiseListPage } from "./useExpertiseListPage";
import { Navbar } from "../../components/Navbar";

export const ExpertiseListPage: React.FC = () => {
  const { tableProps, filterProps } = useExpertiseListPage();

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

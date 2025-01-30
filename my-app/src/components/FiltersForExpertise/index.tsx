import { Button, Card, Form } from "react-bootstrap";
import { FC } from "react";
import { IExpertiseFilterProps } from "./typing";

export const FiltersForExpertise: FC<IExpertiseFilterProps> = ({
  selectedStatus,
  selectedStartDate,
  selectedEndDate,
  handleStatusChange,
  handleStartDateChange,
  handleEndDateChange,
  handleFilterClick,
}) => {
  return (
    <Card className="m-3">
      <Card.Body>
        <Form>
          <div className="d-flex align-items-end justify-content-between">
            {/* Выбор статуса экспертизы */}
            <div className="flex-grow-1 pe-3">
              <Form.Group controlId="status">
                <Form.Label>Статус экспертизы</Form.Label>
                <Form.Select value={selectedStatus} onChange={handleStatusChange}>
                  <option value="">Любой статус</option>
                  <option value="2">Сформирована</option>
                  <option value="4">Принята</option>
                  <option value="5">Отклоненa</option>
                </Form.Select>
              </Form.Group>
            </div>

            {/* Дата создания с */}
            <div className="flex-grow-1 pe-3">
              <Form.Group controlId="startDate">
                <Form.Label>Дата создания с</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedStartDate}
                  onChange={handleStartDateChange}
                />
              </Form.Group>
            </div>

            {/* Дата создания по */}
            <div className="flex-grow-1 pe-3">
              <Form.Group controlId="endDate">
                <Form.Label>Дата создания по</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedEndDate}
                  onChange={handleEndDateChange}
                />
              </Form.Group>
            </div>

            <Button
            className="btn-sm fw-medium"
            style={{
                backgroundColor: "#a26907", 
                borderColor: "#814d08", 
                color: "#ffffff", 
                transition: "background-color 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d48b39")} 
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#a26907")}
            onClick={handleFilterClick}
            >
            Применить
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

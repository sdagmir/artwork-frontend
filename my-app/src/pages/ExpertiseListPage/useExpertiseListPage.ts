import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../core/store/hooks";
import { setFilterExpertiseStatus, setFilterExpertiseStartDate, setFilterExpertiseEndDate } from "../../core/store/slices/appSlice";
import { ChangeEvent } from "../../App.typing";
import { IExpertiseTableProps } from "../../components/ExpertiseListTable/typing";
import { IExpertiseFilterProps } from "../../components/FiltersForExpertise/typing";
import { api } from "../../core/api";

export const useExpertiseListPage = () => {
  const [tableProps, setTableProps] = useState<IExpertiseTableProps>({ rows: [] });

  const { filterExpertiseStatus, filterExpertiseStartDate, filterExpertiseEndDate } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  // Фильтр по статусу экспертизы
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterExpertiseStatus(event.target.value));
  };

  // Фильтр по дате создания
  const handleStartDateChange = (event: ChangeEvent) => {
    dispatch(setFilterExpertiseStartDate(event.target.value));
  };

  // Фильтр по дате завершения
  const handleEndDateChange = (event: ChangeEvent) => {
    dispatch(setFilterExpertiseEndDate(event.target.value));
  };

  // Обработчик применения фильтров
  const handleFilterClick = () => {
    api.paintingExpertise.paintingExpertiseList({
      status: mapStringToOptQueryParam(filterExpertiseStatus),
      formation_start: mapStringToOptQueryParam(filterExpertiseStartDate),
      formation_end: mapStringToOptQueryParam(filterExpertiseEndDate),
    })
      .then((response) => {
        setTableProps(mapBackendResultToTableData(response.data));
      })
      .catch(() => {
        console.error("❌ Ошибка при загрузке экспертиз.");
        setTableProps({ rows: [] });
      });
  };

  // Вызываем загрузку при изменении фильтров
  useEffect(() => {
    handleFilterClick(); 

    const intervalId = setInterval(() => {
        handleFilterClick(); 
    }, 3000);

    return () => clearInterval(intervalId);
}, [filterExpertiseStatus, filterExpertiseStartDate, filterExpertiseEndDate]);

  const filterProps: IExpertiseFilterProps = {
    selectedStatus: filterExpertiseStatus,
    selectedStartDate: filterExpertiseStartDate,
    selectedEndDate: filterExpertiseEndDate,
    handleStatusChange,
    handleStartDateChange,
    handleEndDateChange,
    handleFilterClick,
  };

  return {
    tableProps,
    filterProps,
  };
};

// Функция обработки пустых значений
function mapStringToOptQueryParam(str?: string): string | undefined {
  return str === "" ? undefined : str;
}

// Преобразуем данные из API в формат таблицы
function mapBackendResultToTableData(expertises: any[]): IExpertiseTableProps {
  return {
    rows: expertises.map((expertise) => ({
      number: expertise.pk,
      author: expertise.author || "Не указан",
      status: mapStatusToTable(expertise.status),
      creationDate: convertDatetimeToDDMMYYYY(expertise.date_created),
      completionDate: convertDatetimeToDDMMYYYY(expertise.date_completion),
      result: expertise.result || false,
      qr: expertise.qr
    })),
  };
}

// Функция преобразования статусов
function mapStatusToTable(status?: number): string {
  switch (status) {
    case 2:
      return "Сформирована";
    case 4:
      return "Принята";
    case 5:
      return "Отклонена";
    default:
      return "Неизвестно";
  }
}

// Функция преобразования дат
function convertDatetimeToDDMMYYYY(dateString?: string): string {
  if (!dateString) return "---";

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

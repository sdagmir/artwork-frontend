import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../core/store/hooks";
import { setSearchListTitle } from "../../core/store/slices/appSlice";
import { IPaintingsTableProps } from "../../components/PaintingsListTable/typing";
import { api } from "../../core/api";
import { useNavigate } from "react-router-dom";

export const usePaintingsListPage = () => {
  const [tableProps, setTableProps] = useState<IPaintingsTableProps>({ rows: [] });

  const { searchListTitle } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Обработчик изменения строки поиска
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchListTitle(event.target.value));
  };

  // Функция загрузки списка картин
  const loadPaintings = () => {
    api.paintings.paintingsList({
      title: searchListTitle || undefined, // Передаем поисковый запрос, если он есть
    })
    .then((response) => {
        if (response.data?.paintings) {
          setTableProps(mapBackendResultToTableData(response.data.paintings)); // Берем только paintings
        } else {
          setTableProps({ rows: [] });
        }
      })
      .catch(() => {
        console.error("❌ Ошибка при загрузке картин.");
        setTableProps({ rows: [] });
      });
  };

  // Загружаем картины при изменении поискового запроса
  useEffect(() => {
    loadPaintings();
  }, [searchListTitle]);

  // Функция для перехода на страницу редактирования
  const handleRowClick = (paintingId: number) => {
    navigate(`/paintings/${paintingId}`);
  };

  return {
    tableProps,
    searchListTitle,
    handleSearchChange,
    handleRowClick,
  };
};

// Функция преобразования данных из API в таблицу
function mapBackendResultToTableData(paintings: any[]): IPaintingsTableProps {
  return {
    rows: paintings.map((painting) => ({
      pk: painting.pk,
      title: painting.title,
      shortDescription: painting.short_description || "---",
      description: "---",
      imgPath: painting.img_path,
    })),
  };
}


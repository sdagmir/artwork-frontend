import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../core/store/hooks";
import { 
  updateExpertiseName,
  clearExpertise,
  submitExpertise,
  deleteExpertise
} from "../../core/store/slices/expertiseSlice";
import { setExpertiseId } from "../../core/store/slices/appSlice";
import { api } from "../../core/api";
import { ExpertiseComponent } from "../../core/api/API";

export const useExpertisePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const expertiseId = useParams<{ expertiseId?: string }>().expertiseId || useAppSelector((state) => state.app.expertiseId);
  const { author } = useAppSelector((state) => state.expertise);
  
  const [paintingsList, setPaintingsList] = useState<ExpertiseComponent[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  // Загружаем список картин в экспертизе
  useEffect(() => {
    if (expertiseId) {
      api.paintingExpertise.paintingExpertiseRead(expertiseId)
        .then((response) => {
        console.log("Ответ API!!!!!!!!:", response.data);
          if (response.data) {
            setPaintingsList(response.data.paintings || []);
            dispatch(setExpertiseId(expertiseId));
          }
        })
        .catch(() => {
          console.error("Ошибка при загрузке экспертизы");
        });
    }
  }, [expertiseId]);
  

  const handlePaintingCommentChange = (paintingId: number, comment: string) => {
    api.paintingInExpertise.paintingInExpertisePutUpdate(expertiseId!, String(paintingId), { comment }) 
      .then(() => {
        setPaintingsList((prevPaintings) => {
  
          return prevPaintings.map((painting) => {
            return painting.painting?.id === paintingId
              ? { ...painting, comment }
              : painting;
          });
        });
      })
      .catch(() => {
        console.error("❌ Ошибка при обновлении комментария к картине");
      });
  };
  


  // Удаление картины из экспертизы
  const handleDeletePainting = (paintingId: number) => {
    api.paintingInExpertise.paintingInExpertiseDeleteDelete(expertiseId!, String(paintingId))
      .then(() => {
        setPaintingsList((prevPaintings) =>
          prevPaintings.filter((painting) => painting.painting.id !== paintingId)
        );
        console.log("Картина успешно удалена из экспертизы");
      })
      .catch(() => {
        console.error("Ошибка при удалении картины из экспертизы");
      });
  };

  // Сохранение имени экспертизы (автор)
  const handleSaveExpertiseName = () => {
    dispatch(updateExpertiseName(author));
  };

  // Создание экспертизы
  const handleCreateExpertise = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка на наличие картин
    if (paintingsList.length === 0) {
      setNotification("Экспертиза не может быть пустой. Добавьте хотя бы одну картину.");
      return;
    }

    // Проверка на наличие автора экспертизы
    if (!author.trim()) {
      setNotification("Укажите автора экспертизы перед завершением.");
      return;
    }

    dispatch(
      submitExpertise({
        expertiseId: expertiseId!,
        author: author,
      })
    )
      .then(() => {
        dispatch(clearExpertise());
        navigate("/paintings");
      })
      .catch(() => {
        console.error("Ошибка при создании экспертизы");
      });
  };

  // Очистка экспертизы (удаление)
  const handleClearExpertise = () => {
    if (paintingsList.length < 1) {
      navigate("/paintings");
      return;
    }
    dispatch(deleteExpertise(expertiseId!))
      .then(() => {
        dispatch(clearExpertise());
        navigate("/paintings");
      })
      .catch(() => {
        console.error("Ошибка при удалении экспертизы");
      });
  };

  // Обновление имени экспертизы
  const handleExpertiseAuthorChange = (value: string) => {
    dispatch(updateExpertiseName(value));
  };

  return {
    paintingsList,
    expertiseId,
    author,
    notification,
    handleDeletePainting,
    handlePaintingCommentChange,
    handleSaveExpertiseName,
    handleCreateExpertise,
    handleClearExpertise,
    handleExpertiseAuthorChange,
  };
};

import { useEffect, useState } from "react";
import { ChangeEvent } from "../../App.typing";
import { useAppSelector, useAppDispatch } from "../../core/store/hooks";
import { setSearchTitle, fetchPaintings } from "../../core/store/slices/appSlice";

export const usePaintingsPage = () => {
    const dispatch = useAppDispatch();
    const { searchTitle, paintingList, expertiseId, itemsInCart} = useAppSelector((state) => state.app);

    const [searchTrigger, setSearchTrigger] = useState(false); // Триггер для обновления списка при поиске

    // Обработчик изменения поискового запроса
    const handleSearchTitleChange = (e: ChangeEvent) => {
        dispatch(setSearchTitle(e.target.value));
    };

    // Обработчик кнопки поиска
    const handleSearchPaintingsClick = () => {
        setSearchTrigger((prev) => !prev); // Обновляем состояние для триггера useEffect
    };

    // Загружаем картины при изменении поискового запроса
    useEffect(() => {
        dispatch(fetchPaintings({ title: searchTitle })).unwrap();
    }, [dispatch, searchTrigger]);

    return {
        paintingList,
        expertiseId,
        itemsInCart,
        searchTitle,
        handleSearchPaintingsClick,
        handleSearchTitleChange,
    };
};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { api } from "../../core/api";
import { Painting } from "../../core/api/API";
import { incrementItemsInCart } from "../../core/store/slices/appSlice";
import { paintingList as PAINTINGS_LIST_MOCK } from "../../core/mock/chemicalElementList";

export const usePaintingPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pk } = useParams();
    
    const [paintingDetail, setPaintingDetail] = useState<Painting | null>(null);
    const { isAuth } = useAppSelector((state) => state.user);

    // Функция загрузки данных о картине
    const fetchPaintingDetail = async () => {
        if (pk) {
            try {
                const response = await api.paintings.paintingsRead(pk);
                setPaintingDetail(response.data);
            } catch {
                const mockPainting = PAINTINGS_LIST_MOCK.find((element) => element.pk === Number(pk));
                setPaintingDetail(mockPainting || null);
            }
        }
    };

    // Обработчик добавления в корзину
    const handleAddToCart = async () => {
        if (!isAuth) {
            console.log("Пользователь не авторизован. Пожалуйста, выполните вход.");
            alert("Вы должны авторизоваться, чтобы добавить картину в корзину.");
            navigate("/login");
            return;
        }

        try {
            // Здесь предполагается, что на бэке есть соответствующий API для добавления в корзину
            // Можно вызвать dispatch, если уже реализован slice для корзины
            dispatch(incrementItemsInCart());
            console.log("Картина успешно добавлена в корзину.");
        } catch (error) {
            console.error("Ошибка добавления картины в корзину:", error);
        }
    };

    useEffect(() => {
        fetchPaintingDetail();
    }, [pk]);

    return {
        paintingDetail,
        handleAddToCart,
    };
};

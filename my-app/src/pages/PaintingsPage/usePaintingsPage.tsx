import { useEffect, useState } from "react";
import { ChangeEvent } from "../../App.typing.tsx";
import { paintingList as PAINTINGS_LIST_MOCK} from "../../core/mock/chemicalElementList.ts";
import { IPaintingDetail } from "../../core/api/service/typing.ts";
import { getPaintingsList } from "../../core/api/service/index.ts";
import { useAppSelector, useAppDispatch } from '../../core/store/hooks.ts';
import { setSearchTerm } from '../../core/store/slices/searchSlice.ts';

export const useChemicalCatalogPage = () => {
    const dispatch = useAppDispatch();
    const { searchTerm } = useAppSelector((state) => state.search);
    const [paintingsList, setPaintingsList] = useState<IPaintingDetail[]>([])
    const [expertiseId, setExpertiseId] = useState<number>(0);
    const [itemsInCart, setItemsInCart] = useState<number>(0);

    const fetchPaintings = (title?: string) => {
        getPaintingsList(title)
        .then((data) => {
            setPaintingsList(data.paintings);
            setExpertiseId(data.expertise_id);
            setItemsInCart(data.count)
        })
        .catch(() => {
            let filteredPaintings = PAINTINGS_LIST_MOCK;
            if (title && title !== undefined) {
                filteredPaintings = filteredPaintings.filter((paintingDetail: IPaintingDetail) =>
                    paintingDetail.title.toLowerCase().includes(title.toLowerCase())
                );
            }
            setPaintingsList(filteredPaintings);
            setExpertiseId(0);
            setItemsInCart(0);
        });
    };

    const handleSearchPaintingsClick = () => {
        fetchPaintings(searchTerm);
    };

    const handleSearchTitleChange = (e: ChangeEvent) => {
        const newSearchTerm = e.target.value;
        dispatch(setSearchTerm(newSearchTerm));
    };

    useEffect(() => {
        fetchPaintings(searchTerm);
    }, []);

    return {
        paintingsList,
        expertiseId,
        itemsInCart,
        searchTerm,
        handleSearchTitleChange,
        handleSearchPaintingsClick,
    };
};
import { useEffect, useState } from "react";
import { ChangeEvent } from "../../App.typing.tsx";
import { paintingList as PAINTINGS_LIST_MOCK} from "../../core/mock/chemicalElementList.ts";
import { IPaintingDetail } from "../../core/api/service/typing.ts";
import { getPaintingsList } from "../../core/api/service/index.ts";

export const useChemicalCatalogPage = () => {
    const [paintingsList, setPaintingsList] = useState<IPaintingDetail[]>([])
    const [expertiseId, setExpertiseId] = useState<number>(0);
    const [itemsInCart, setItemsInCart] = useState<number>(0);
    const [searchPaintingTitle, setSearchPaintingTitle] = useState("");

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

    const handleSearchPaintingClick = () => {
        fetchPaintings(searchPaintingTitle);
    };

    const handleSearchTitleChange = (e: ChangeEvent) => {
        setSearchPaintingTitle(e.target.value);
    };

    useEffect(() => {
        fetchPaintings();
    }, []);

    return {
        paintingsList,
        expertiseId,
        itemsInCart,
        handleSearchPaintingClick,
        handleSearchTitleChange,
    };
};
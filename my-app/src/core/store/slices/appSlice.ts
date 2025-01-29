import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api"; 
import { IPaintingDetail } from "../../api/service/typing"; 
import { paintingList as PAINTINGS_LIST_MOCK } from "../../mock/chemicalElementList"; 

// Интерфейс состояния каталога картин
interface PaintingCatalogState {
    searchTitle: string; 
    paintingList: IPaintingDetail[]; 
    filterExpertiseStatus?: string;
    filterExpertiseStartDate?: string;
    filterExpertiseEndDate?: string;
    expertiseId: string | null; 
    itemsInCart: number; 
    isLoading: boolean; 
}

// Начальное состояние
const initialState: PaintingCatalogState = {
    searchTitle: "",
    paintingList: [],
    filterExpertiseStatus: undefined,
    filterExpertiseStartDate: undefined,
    filterExpertiseEndDate: undefined,
    expertiseId: null,
    itemsInCart: 0,
    isLoading: false,
};

// Асинхронный thunk для получения списка картин из API
export const fetchPaintings = createAsyncThunk(
    "paintings/fetchPaintings",
    async (
      { title }: { title?: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.paintings.paintingsList(
            title ? { title }  : {} // Исправленный вызов API
          );
        return response.data;
      } catch (error) {
        return rejectWithValue({ title });
      }
    }
  );

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSearchTitle: (state, action: PayloadAction<string>) => {
            state.searchTitle = action.payload;
        },
        setFilterExpertiseStatus: (state, action: PayloadAction<string>) =>{
            state.filterExpertiseStatus = action.payload;
        },
        setFilterExpertiseStartDate: (state, action: PayloadAction<string>) =>{
            state.filterExpertiseStartDate = action.payload;
        },
        setFilterExpertiseEndDate: (state, action: PayloadAction<string>) =>{
            state.filterExpertiseEndDate = action.payload;
        },
        incrementItemsInCart: (state) => {
            state.itemsInCart += 1;
        },
        decrementItemsInCart: (state) => {
            state.itemsInCart = Math.max(0, state.itemsInCart - 1);
        },
        setExpertiseId: (state, action: PayloadAction<string>) => {
            state.expertiseId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaintings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPaintings.fulfilled, (state, action) => {
                state.paintingList = action.payload.paintings || [];
                state.expertiseId = action.payload.expertise_id || null; 
                state.itemsInCart = action.payload.count || 0; 
                state.isLoading = false;
                console.log("Fetched paintings:", action.payload.paintings);
            })
            .addCase(fetchPaintings.rejected, (state, action) => {
                const { title } = action.payload as { title?: string };

                state.paintingList = PAINTINGS_LIST_MOCK.filter((painting) => {
                    return title
                        ? painting.title.toLowerCase().includes(title.toLowerCase())
                        : true;
                });

                state.expertiseId = null;
                state.itemsInCart = 0;
                state.isLoading = false;
            });
    },
});

export const {
    setSearchTitle,
    incrementItemsInCart,
    decrementItemsInCart,
    setExpertiseId,
    setFilterExpertiseStatus,
    setFilterExpertiseEndDate,
    setFilterExpertiseStartDate,
} = appSlice.actions;

export default appSlice.reducer;

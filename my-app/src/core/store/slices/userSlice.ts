import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api"; 
import { User } from "../../api/API"; 
import { LoginDataProps } from "../../../pages/LoginPage/typing";

interface UserState {
    username: string;
    email: string;
    isAuth: boolean;
    loading: string;
    error: boolean;
}

const initialState : UserState =  {
    username : "",
    email: "",
    isAuth: false,
    loading: "",
    error: false
}

export const registerUser = createAsyncThunk(
  "user/register", 
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await api.user.userCreateCreate(userData); 

      if (response.status === 201) {
        return {username: userData.username, email: userData.email}; 
      }
      else {
        return rejectWithValue('Ошибка регистрации. Попробуйте снова.');
      }
    } catch (err) {
        return rejectWithValue('Ошибка регистрации. Попробуйте снова.');
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData: LoginDataProps, { rejectWithValue }) => {
    try {
      const response = await api.user.userLoginCreate(loginData)

      if (response.status === 201) {
        return response.data;
      }
      else {
        return rejectWithValue('Ошибка авторизации. Попробуйте снова.');
      }
    } catch (error) {
        return rejectWithValue('Такого пользователя нет. Проверьте данные.');
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await api.user.userUpdateUpdate(userData);

      if (response.status === 200) {
        return response.data;
      }
      else {
        return rejectWithValue('Не удалось обновить данные.');
      }
    } catch {
      return rejectWithValue('Произошла ошибка при обновлении данных.');
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.user.userLogoutCreate(); 

      if (response.status === 204) {
        return {};
      } else {
        return rejectWithValue("Ошибка при выходе из аккаунта. Повторите попытку");
      }
    } catch (error) {
      return rejectWithValue("Ошибка при выполнении запроса.");
    }
  }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUsername: (state, action: PayloadAction<{ username: string; }>) => {
            state.username = action.payload.username;
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.fulfilled, (state, action) => {
          state.username = String(action.payload.username);
          state.email = String(action.payload.email);
          state.isAuth = true;
          state.loading = "succeeded";
          state.error = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.error = true;
          state.loading = "failed";
          console.error(action.payload);
          console.log("ERROR REGISTER", action.payload)
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isAuth = true;
          state.username = String(action.payload.username);
          console.log(state.username);
          state.email = String(action.payload.email);
          console.log(state.email);
          state.error = false;
          state.loading = "succeeded";
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = true;
          state.loading = "failed";
          console.error(action.payload);
          console.log("ERROR LOGIN", action.payload)
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.email = action.payload.email || state.email;
          state.error = false;
          state.loading = "succeeded";
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.error = true;
          state.loading = "failed"; 
          console.error(action.payload);
          console.log("ERROR UPDATE", action.payload)
        })
        .addCase(logoutUser.fulfilled, () => initialState) 
        .addCase(logoutUser.rejected, (state) => {
          state.error = true;
          state.loading = "failed";
      });
    },  
  });

  export const { saveUsername } = userSlice.actions;

  export default userSlice.reducer;
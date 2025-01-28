import { AppRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { store } from './core/store/store';
import { Provider } from 'react-redux';
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from 'react';
import { dest_root } from "../target_config";

function App() {
  useEffect(()=>{
    invoke('tauri', {cmd:'create'})
      .then(() =>{console.log("Tauri launched")})
      .catch(() =>{console.log("Tauri not launched")})
    return () =>{
      invoke('tauri', {cmd:'close'})
        .then(() =>{console.log("Tauri launched")})
        .catch(() =>{console.log("Tauri not launched")})
    }
  }, [])

  return (
    <BrowserRouter basename={dest_root}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
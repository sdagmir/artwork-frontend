export const target_tauri = true

export const api_proxy_addr = "http://192.168.0.105:8000"
export const img_proxy_addr = "http://192.168.0.105:9000"
export const dest_api = (target_tauri) ? api_proxy_addr : "/api"
export const dest_img =  (target_tauri) ?  img_proxy_addr : "/web-img"
export const dest_root = (target_tauri) ? "" : "/artwork-frontend"
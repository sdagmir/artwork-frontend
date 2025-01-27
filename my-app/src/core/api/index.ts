import { IRequestOptions } from "./typing.ts";

export const BASE_URL = "/api";


export const sendRequest = async (options: IRequestOptions) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const {
        method,
        path,
        headers = {},
        params = undefined,
        data
    } = options;

    let url = BASE_URL + path;

    const requestOptions: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
    };

    if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                searchParams.append(key, String(value));
            }
        });
        url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {...requestOptions, signal: controller.signal}).finally(() => clearTimeout(timeout));
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};
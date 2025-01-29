// import { sendRequest } from "../index.ts";
// import { IPaintingDetail, IGetPaintingsResponse } from "./typing"


// export const getPaintingsList = async (searchTitle?: string) => {
//     try {
//         const params: {[key: string]: any} = {};
//         if (searchTitle !== undefined) params.title = searchTitle;

//         const response: IGetPaintingsResponse = await sendRequest({
//             method: "GET",
//             path: "/paintings",
//             params,
//         });
//         return response;
//     } catch (error) {
//         console.error("Error fetching paintings list:", error);
//         throw error;
//     }
// };

// export const getPaintingById = async (id: string) => {
//     try {
//         const response: IPaintingDetail = await sendRequest({
//             method: "GET",
//             path: `/paintings/${id}`,
//         });
//         return response;
//     } catch (error) {
//         console.error("Error fetching painting by id:", error);
//         throw error;
//     }
// };
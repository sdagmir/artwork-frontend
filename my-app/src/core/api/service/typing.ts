export interface IPaintingDetail {
    id: number;
    title: string;
    img_path: string;
    short_description: string;
    description: string;
}

export interface IGetPaintingsResponse {
    paintings: IPaintingDetail[];
    expertise_id: number;
    count: number;
}

export interface IPaintingInExpertise {
    pk: number;
    title: string;
    img_path: string;
    comment: string;
}

export interface ICreateExpertiseByIdResponse {
    pk: number;
    status: number;
    user: string;
    date_created: string;
    author: string;
    date_formation: string;
    date_completion: string;
    manager: number;
    paintings: IPaintingInExpertise[];
}
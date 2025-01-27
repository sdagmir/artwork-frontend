export interface IBreadcrumbs {
    middleItems?: IBreadcrumbsItem[];
    endItem?: string;
}

export interface IBreadcrumbsItem {
    name: string;
    link: string;
}
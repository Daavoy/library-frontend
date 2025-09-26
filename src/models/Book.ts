export interface Book {
    id: number;
    title?: string;
    author?: string;
    description?: string;
    isbn?: string;
    thumbnail?: File;
    categories?: Category[]
}

export interface Category {
    id: number;
    categoryName: string;
    categoryCode?: string;
    alternativeName?: string;

}
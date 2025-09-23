export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    isLiked?: boolean;
}

export interface ProductFormData {
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
}
export interface Product {
    id: number;
    name: string;
    description: string;
    categoryName: string;
    imageFile: string;
    unitOfMeasure: string;
    quantity?: number;
    totalPrice?: number;
    price: string;
}

export type GetItemsType = {
    idItem: number;
    title: string;
    weight: number;
    price: number;
    iconUrl?: string;
    fotoUrl?: string;
    text?: string;
    discount: number;
    quantity: number;
};

export type ContactsType = {
    subject: 'pickup' | 'delivery';
    adddres: string;
    name: string;
    telNo: string;
    comment: string;
};

export type ProductsType = {idItem: number; amount: number};
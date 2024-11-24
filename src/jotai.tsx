import {atom} from "jotai";

type MenuItem = {
    name: string;
    price: number;
};

export const cartAtom = atom<MenuItem[]>([]);
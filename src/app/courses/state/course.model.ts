import { ID } from "@datorama/akita";

export type Course = {
    id: ID;
    name: string;
    description: string;
    price: number;
}
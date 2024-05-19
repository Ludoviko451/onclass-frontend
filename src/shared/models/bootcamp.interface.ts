import { ICapacity } from "./capacity.interface";

export interface IBootcamp {
    id: number;
    name: string;
    description: string;
    capacities: ICapacity[]
}
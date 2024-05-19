import { ITechnology } from "./technology.interface";

export interface ICapacity {
    id: number;
    name: string;
    description: string;
    technologies: ITechnology[]
}
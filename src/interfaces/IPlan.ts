import { injectable } from "inversify";

export interface IPlan {
    type: string;
    name: string;
    amount: string;
    validity: string;
    data: string;
}

@injectable()
export class Plan implements IPlan {
    constructor(
        public type: string,
        public amount: string,
        public validity: string,
        public data: string,
        public name: string,
        public _id?: string
    ) { }

}
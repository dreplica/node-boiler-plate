

export interface POST{
    organization: string;
    ceo: string;
    address: string;
    employees: string[];
    products:string[]
}


export interface RESULT {
    data?: any,
    error?: string,
    code: number
}

export type LOGIN = { username: string; password: string }

export type REGISTER   = LOGIN & {
    age: number;
}


export interface GETREQUEST extends Pick<POST, "organization"|"ceo"|"address">{
    employee: string[]|string;
    product: string[] | string;
    totalEmployees:number
}
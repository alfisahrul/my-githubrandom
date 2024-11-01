export interface CommonResponse<T> {
    successOrNot : boolean;
    message:string;
    data: T;

}
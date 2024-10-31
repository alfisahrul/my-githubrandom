export interface CommonResponse<T> {
    successOrNot : string;
    statusCode: string;
    data: T;

}
import { GithubRepositories } from "../../../interfaces/entities/repositories";
import { apiGet } from "../../../utils/api";
import { CommonResponse } from "../../../utils/common";

export const getRepositories = async () : Promise<CommonResponse<GithubRepositories[]>> =>{
    const url  = "https://api.github.com/search/repositories?q=language:csharp"

    const response = await apiGet<CommonResponse<GithubRepositories>>(url)
    if (!response || response.data){
        throw new Error("Failed to fetch Repositories");

    }
    return response.data;
}
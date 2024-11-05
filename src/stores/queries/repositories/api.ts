import { GithubRepositories } from "../../../interfaces/entities/repositories";
import { apiGet } from "../../../utils/api";
import { CommonResponse } from "../../../utils/common";

export const getRepositories = async (): Promise<CommonResponse<GithubRepositories>> => {
    const url = `https://api.github.com/search/repositories?q=language:csharp&per_page=1&page=3`;
    const response = await apiGet<GithubRepositories>(url);

    if (!response || !response.data) {
        throw new Error("Failed to fetch Repositories");
    }
    function convertKeysToCamelCase(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map(convertKeysToCamelCase);
        } else if (obj !== null && obj.constructor === Object) {
            return Object.entries(obj).reduce((acc, [key, value]) => {
                const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
                acc[camelKey] = convertKeysToCamelCase(value);
                return acc;
            }, {} as Record<string, any>);
        }
        return obj;
    }

    return convertKeysToCamelCase(response);
}

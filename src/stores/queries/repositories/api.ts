import { GithubRepositories } from "../../../interfaces/entities/repositories";
import { apiGet } from "../../../utils/api";
import { CommonResponse } from "../../../utils/common";

export const getRepositories = async (language: string): Promise<CommonResponse<GithubRepositories>> => {
    const validLanguage = language || "javascript"
    const randomPage = Math.floor(Math.random() * 10) + 1;

    const url = `https://api.github.com/search/repositories?q=language:${encodeURI(validLanguage)}&page=${randomPage}`;
    
    const response = await apiGet<GithubRepositories>(url);

    if (!response || !response.data) {
        throw new Error("Failed to fetch repositories");
    }

    function convertKeysToCamelCase<T>(obj: any): T {
        if (Array.isArray(obj)) {
            return obj.map(convertKeysToCamelCase) as unknown as T;
        } else if (obj !== null && obj.constructor === Object) {
            return Object.entries(obj).reduce((acc, [key, value]) => {
                const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
                acc[camelKey] = convertKeysToCamelCase(value);
                return acc;
            }, {} as Record<string, any>) as T;
        }
        return obj;
    }

    return convertKeysToCamelCase<CommonResponse<GithubRepositories>>(response);
};

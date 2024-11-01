import { Language } from "../../../interfaces/entities/language";
import { CommonResponse } from "../../../utils/common";
import { apiGet } from "../../../utils/api";

export const getLanguage = async (): Promise<CommonResponse<Language>> => {
    const url = "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"
    const response = await apiGet<CommonResponse<Language>>(url)
    return response.data
    throw Error("Failed to fetch Language");
}
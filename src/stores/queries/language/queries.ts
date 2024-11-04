import { useQuery } from "@tanstack/react-query";
import { getLanguage } from "./api";
import { Language } from "../../../interfaces/entities/language";
import { CommonResponse } from "../../../utils/common";

export const useLanguage = () => {
    return useQuery<CommonResponse<Language[]>>({
        queryKey: ["language"],
        queryFn: () => getLanguage(),
    })

}
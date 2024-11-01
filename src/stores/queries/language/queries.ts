import { useQuery } from "@tanstack/react-query";
import { getLanguage } from "./api";

export const useLanguage = () => {
    return useQuery({
        queryKey: ["language"],
        queryFn: () => getLanguage(),
    })

}
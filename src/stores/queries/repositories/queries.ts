import { useQuery } from "@tanstack/react-query"
import { getRepositories } from "./api"
import { CommonResponse } from "../../../utils/common"
import { GithubRepositories } from "../../../interfaces/repositories"

export const useGithubRepositories = (language:string) => {
    return useQuery<CommonResponse<GithubRepositories>>({
        queryKey:["githubRepositories",language],
        queryFn : () => getRepositories(language),
        enabled: !!language && language.trim() !== "",
    })
}
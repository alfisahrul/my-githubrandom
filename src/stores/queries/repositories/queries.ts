import { useQuery } from "@tanstack/react-query"
import { getRepositories } from "./api"
import { CommonResponse } from "../../../utils/common"
import { GithubRepositories } from "../../../interfaces/entities/repositories"

export const useGithubRepositories = () => {
    return useQuery<CommonResponse<GithubRepositories>>({
        queryKey:["githubRepositories"],
        queryFn : getRepositories,
    })
}
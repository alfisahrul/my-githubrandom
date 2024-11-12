export interface GithubRepository {
    id: number;
    fullName: string;
    description: string;
    stargazersCount: number;
    forksCount: number;
    openIssuesCount: number;
    language: string;
    htmlUrl:string;

}

export interface GithubRepositories {
    totalCount: number;
    incomplateResults: boolean;
    items: GithubRepository[];
}
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getRepositories } from "../../stores/queries/repositories/api";
import { GithubRepositories } from "../../interfaces/entities/repositories";

type RepositoriesState = {
    repositoriesData: GithubRepositories | null;
    error: string | null;
    isLoading: boolean;
    fetchRepositories: (language: string) => Promise<void>;
};

export const useRepositoriesStore = create<RepositoriesState>()(
    immer((set) => ({
        repositoriesData: null,
        error: null,
        isLoading: false,

        fetchRepositories: async (language: string) => {
            set((state) => {
                state.isLoading = true;
                state.error = null;
            });
            try {
                const response = await getRepositories(language);
                set((state) => {
                    state.repositoriesData = response.data; // Store data in repositoriesData
                    state.isLoading = false;
                });
            } catch (error) {
                set((state) => {
                    state.error = error instanceof Error ? error.message : "An error occurred";
                    state.isLoading = false;
                });
            }
        },
    }))
);

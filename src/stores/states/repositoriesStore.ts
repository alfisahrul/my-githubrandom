import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { GithubRepository } from "../../interfaces/repositories";

interface RepositoriesState {
    selectedRepo: GithubRepository | null;
    selectRandomRepo: (repositoriesData: GithubRepository[]) => void;
}

export const useRepositoriesStore = create(
    immer<RepositoriesState>((set) => ({
        selectedRepo: null,

        // Function to select a random repository from fetched data
        selectRandomRepo: (repositoriesData) => {
            if (repositoriesData.length > 0) {
                const randomRepo = repositoriesData[Math.floor(Math.random() * repositoriesData.length)];
                set({ selectedRepo: randomRepo });
            }
        },
    }))
);

import * as Select from "@radix-ui/react-select";
import styles from "./style.module.css";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import React, { Suspense, useEffect, useMemo } from "react";
import { useLanguage } from "../../stores/queries/language/queries";
import { Language } from "../../interfaces/language";
import { useGithubRepositories } from "../../stores/queries/repositories";
import { useLanguageStore } from "../../stores/states/languageStore";
import { useRepositoriesStore } from "../../stores/states/repositoriesStore";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { ErrorBoundary } from "react-error-boundary";
import ButtonStyled from "../../components/ui/Button";

type SelectItemProps = {
    value: string;
    children: React.ReactNode;
    className?: string;
};

const Card = React.lazy(() => import("../../components/ui/Card"));

export const GithubRepoRandom = () => {
    const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
    const { selectedRepo, selectRandomRepo } = useRepositoriesStore();

    const {
        data: languageData,
        isError: languageError,
        isLoading: isLanguagesLoading,
    } = useLanguage();

    const {
        data: repositoriesData,
        isError: repositoryError,
        refetch,
    } = useGithubRepositories(selectedLanguage);

    if (languageError || repositoryError) {
        throw new Error("Failed to fetch data. Please try again.");
    }

    const repositoriesArray = useMemo(() => repositoriesData?.data.items || [], [
        repositoriesData,
    ]);

    console.log(repositoriesArray);

    useEffect(() => {
        if (repositoriesArray.length > 0) {
            selectRandomRepo(repositoriesArray);
        }
    }, [repositoriesArray, selectRandomRepo]);

    const languagesArray = languageData?.data || [];

    const handleLanguageSelect = (value: string) => {
        useLanguageStore.getState().setSelectedLanguage(value);  // Using Zustand store action to set the selected language
        if (value) refetch(); // Trigger re-fetch of repositories when language changes
    };

    const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
        ({ children, className, value, ...props }, forwardedRef) => {
            const validValue = value || "(Unknown)";
            return (
                <Select.Item
                    value={validValue}
                    className={className ? `${styles.Item} ${className}` : styles.Item}
                    {...props}
                    ref={forwardedRef}
                >
                    <Select.ItemText>{children}</Select.ItemText>
                    <Select.ItemIndicator className={styles.ItemIndicator}>
                        <CheckIcon />
                    </Select.ItemIndicator>
                </Select.Item>
            );
        }
    );

    SelectItem.displayName = "SelectItem";

    return (
        <>
            <h1>Github Random Repo</h1>
            <Select.Root onValueChange={handleLanguageSelect}>
                <Select.Trigger className={styles.Trigger} aria-label="Language">
                    <Select.Value placeholder="Select a Language" />
                    <Select.Icon className={styles.Icon}>
                        <ChevronDownIcon />
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content className={styles.Content}>
                        <Select.Viewport className={styles.Viewport}>
                            <Select.Group>
                                <Select.Label className={styles.Label}>Select Here</Select.Label>
                                {languagesArray.map((language: Language, index: number) => (
                                    <SelectItem key={index} value={language.value || ""}>
                                        {language.title || "Unknown Language"}
                                    </SelectItem>
                                ))}
                            </Select.Group>
                            <Select.Separator className={styles.Separator} />
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>

            <div>
                <ErrorBoundary fallback={<div>Failed to load repository</div>}>
                    {selectedRepo ? (
                        <Suspense fallback={<LoadingSpinner isLoading loadingMessage="Please Wait  .... " />}>
                            <Card
                                fullName={selectedRepo?.fullName || ""}
                                description={selectedRepo?.description || "No description available"}
                                language={selectedRepo?.language || "Unknown"}
                                stargazersCount={selectedRepo?.stargazersCount ?? 0}
                                forksCount={selectedRepo?.forksCount ?? 0}
                                openIssuesCount={selectedRepo?.openIssuesCount ?? 0}
                                htmlUrl={selectedRepo?.htmlUrl || ""}
                            />
                        </Suspense>
                    ) : (
                        <div>No repository found.</div>
                    )}
                </ErrorBoundary>
            </div>

            <ButtonStyled
                onClick={() => selectRandomRepo(repositoriesArray)}
                text="Refresh"
            />
        </>
    );
};

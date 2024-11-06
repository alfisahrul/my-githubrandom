import * as Select from "@radix-ui/react-select";
import styles from "./style.module.css"
import {
    CheckIcon,
    ChevronDownIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { useLanguage } from "../../stores/queries/language/queries";
// import { mockLanguages } from "../../mocks/language";
import { Language } from "../../interfaces/entities/language";
import { useGithubRepositories } from "../../stores/queries/repositories";
import { CardStyled } from "../../components/ui/CardsStyled";
import { useLanguageStore } from "../../stores/states/languageStore";

type SelectItemProps = {
    value: string;
    children: React.ReactNode;
    className?: string;
};

export const GithubRepoRandom = () => {
    const { data: languageData, isLoading: isLoadingLanguages, error: languageError } = useLanguage();
    const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
    const setSelectedLanguage = useLanguageStore((state) => state.setSelectedLanguage);
    const { data: repositoriesData, isLoading: isLoadingRepositories, error: repositoryError, refetch } = useGithubRepositories(selectedLanguage);


    const isLoading = isLoadingLanguages || isLoadingRepositories;

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (languageError) {
        return <div>Error fetching languages: {languageError.message}</div>;
    }
    if (repositoryError) {
        return <div>Error fetching repositories: {repositoryError.message} </div>;
    }
    const repositoriesArray = repositoriesData?.data?.items || [];
    const languagesArray = languageData?.data || []; // Access the data property to get the array of languages


    if (!Array.isArray(languagesArray)) {
        console.error('languagesArray is not an array or is undefined:', languageData);
        return <div>No data available.</div>;
    }

    const handleLanguageSelect = (value: string) => {
        setSelectedLanguage(value);
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
                                <Select.Label className={styles.Label}>Select Here </Select.Label>
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
                {repositoriesArray.length > 0 ? (
                    // Select a random repository and pass it to CardStyled
                    <CardStyled />
                ) : (
                    <div>No repository found.</div>
                )}
            </div>
        </>
    );
};




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

type SelectItemProps = {
    value: string;
    children: React.ReactNode;
    className?: string;
};

export const GithubRepoRandom = () => {
    const { data: languageData, isLoading: isLoadingLanguages, error: languageError } = useLanguage();

    const { data: repositoriesData, isLoading: isLoadingRepositories, error: repositoryError } = useGithubRepositories();
    const isLoading = isLoadingLanguages || isLoadingRepositories;

    if (!languageData || !repositoriesData) {
        return <div>No data available.</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (languageError) {
        return <div>Error fetching languages: {languageError.message}</div>;
    }

    if (repositoryError) {
        return <div>Error fetching repositories: {repositoryError.message}</div>;
    }

    if (!languageData || !repositoriesData) {
        return <div>No data available.</div>;
    }

    if (!Array.isArray(languageData)) {
        console.error('languagesArray is not an array or is undefined:', languageData);
        return <div>No data available.</div>;
    }
    const languagesArray = languageData;
 
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
            <Select.Root>
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
                                {languagesArray.map((language: Language, index: number) => {
                                    const value = language.value || "";
                                    return (
                                        <SelectItem key={index} value={value}>
                                            {language.title || "Unknown Language"} 
                                        </SelectItem>
                                    );
                                })}
                            </Select.Group>
                            <Select.Separator className={styles.Separator} />
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>


        </>
    );
};




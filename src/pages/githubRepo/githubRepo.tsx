import * as Select from "@radix-ui/react-select";
import styles from "./style.module.css"
import {
    CheckIcon,
    ChevronDownIcon,
} from "@radix-ui/react-icons";
import React from "react";


type SelectItemProps = {
    value: string;
    children: React.ReactNode;
    className?: string;
};

export const GithubRepoRandom = () => {

    const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
        ({ children, className, ...props }, forwardedRef) => {
            return (
                <Select.Item
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
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </Select.Group>
                            <Select.Separator className={styles.Separator} />
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </>
    );
};




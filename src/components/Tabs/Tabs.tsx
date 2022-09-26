import React, {JSXElementConstructor, ReactElement, useState} from "react";
import classNames from "classnames";
import styles from "./Tabs.module.scss";

export enum ETabsMode {
    Primary = 'primary',
    Secondary = 'secondary',
}


export interface ITab {
    tabName: string;
    activeTabName: string;
    mode: ETabsMode
    handleTabClick: (activeTab: string) => void;
}


export interface ITabs {
    title?: string
    mode: ETabsMode
    children?: ReactElement[];
}



export const TabWrapper: React.FC<{ tabName: string }> = ({children}) => {
    return <div className={styles.tabWrapper}>{children}</div>;
};

export const Tabs: React.FC<ITabs> = ({children, mode, title}) => {
    const tabWrappers = children?.filter((s) => (s.type as JSXElementConstructor<ReactElement>).name === TabWrapper.name);
    const initialTabName: string = tabWrappers != null && tabWrappers?.length > 0 ? tabWrappers[0].props.tabName : "";
    const [activeTabName, setActiveTabName] = useState<string>(initialTabName);

    return (
        <div className={styles.tabs}>
            <div className={classNames(styles.tabsHeader, styles[mode])}>
                {title && <div className={styles.tabsHeaderTitle}>{title}</div>}
                <div className={classNames(styles.tabsHeaderWrap, styles[mode])}>
                    {tabWrappers?.map((child) => (
                        <Tab
                            mode={mode}
                            key={child.props.tabName}
                            tabName={child.props.tabName}
                            handleTabClick={setActiveTabName}
                            activeTabName={activeTabName}
                        />
                    ))}
                </div>
            </div>
            {
                <div className={styles.tabsContent}>
                    {tabWrappers?.map((child) => child.props.tabName === activeTabName ? (
                        <div
                            key={child.props.tabName}
                        >
                            {child}
                        </div>
                    ) : null)}
                </div>
            }
        </div>
    );
};

const Tab: React.FC<ITab> = ({tabName, activeTabName, handleTabClick, mode}) => {
    const isActive = activeTabName === tabName;
    return (
        <button
            onClick={() => handleTabClick(tabName)}
            className={classNames(styles.tabsHeaderTab, styles[mode], {
                [styles.tabsHeaderTabActive]: isActive,
            })}
        >
            {tabName}
        </button>
    );
};

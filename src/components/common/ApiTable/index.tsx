import { useState, Fragment } from 'react';
import styles from 'components/common/ApiTable/styles.module.sass';
import type { TypeTableProp, TypeTableEvent, TypeTableSlot } from 'components/common/ApiTable/types';

type Props = {
    propList: TypeTableProp[],
    eventList: TypeTableEvent[],
    slotList: TypeTableSlot[],
}
 
const defaultProps: Props = {
    propList: [],
    eventList: [],
    slotList: [],
};

function ApiTable(prevProps: Props): JSX.Element {
    const props = { ...defaultProps, ...prevProps };

    // BLOCK "nav"
    type TypeNav = {
        id: string,
        title: string,
    }

    const navList = (): TypeNav[] => {
        const navs: TypeNav[] = [
            { id: 'propList', title: 'Properties' },
            { id: 'eventList', title: 'Events' },
            { id: 'slotList', title: 'Slots' },
        ];

        type TypeKey = keyof typeof props;
        return navs.filter(item => props[item.id as TypeKey].length);
    };

    const [activeNavId, setActiveNav] = useState<string>('propList');

    const getActiveClass = (id: string): string => {
        return activeNavId === id ? 'nav_active' : '';
    };

    // BLOCK "header"
    type TypeHeader = {
        id: string,
        title: string,
        color?: string,
    }

    const headerList: { [name: string]: TypeHeader[] } = {
        propList: [
            { id: 'name', title: 'Name', color: 'blue' },
            { id: 'type', title: 'Type', color: 'green' },
            { id: 'default', title: 'Default' },
        ],
        eventList: [
            { id: 'name', title: 'Name', color: 'blue' },
            { id: 'parameters', title: 'Parameters', color: 'green' },
        ],
        slotList: [
            { id: 'name', title: 'Name', color: 'blue' },
            { id: 'default', title: 'Default' },
        ],
    };

    // BLOCK "body"
    const items = () => {
        type TypeKey = keyof typeof props;
        return props[activeNavId as TypeKey];
    };

    return (
        <div className={styles.api}>
            <div className={styles.title}>API</div>

            <div className={styles.nav}>
                {navList().map(nav =>
                    <div
                        className={`${styles['nav-item']} ${styles[getActiveClass(nav.id)]}`}
                        key={nav.id}
                        onClick={() => setActiveNav(nav.id)}
                    >
                        {nav.title}
                    </div>,
                )}
            </div>

            <div className={styles.table}>
                <div className={styles.header}>
                    {headerList[activeNavId].map(header =>
                        <div
                            className={styles['header-item']}
                            key={header.id}
                        >
                            {header.title}
                        </div>,
                    )}
                </div>

                <div className={styles.body}>
                    {items().map(item =>
                        <Fragment key={item.name}>
                            <div className={styles['body-row']}>
                                {headerList[activeNavId].map(header =>
                                    <div
                                        className={`${styles['body-column']} ${styles['color-' + header.color]}`}
                                        key={header.id}
                                    >
                                        {item[header.id]}
                                    </div>,
                                )}
                            </div>
                            <div className={styles['body-row-description']}>{item.description}</div>
                        </Fragment>,
                    )}
                </div>
            </div>
        </div>
    );
}

export default ApiTable;
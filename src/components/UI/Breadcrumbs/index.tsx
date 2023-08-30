import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/UI/Breadcrumbs/styles.module.sass';
import type { TypeCrumb } from 'components/UI/Breadcrumbs/types';

type Props = {
    className?: string,
    size?: string,
    items: TypeCrumb[],
    children?: { separator: React.ReactNode },
}

function Breadcrumbs(prevProps: Props): JSX.Element {
    const props = {
        size: 'medium',
        children: { separator: '' },
        ...prevProps,
    };

    const componentClasses = `
        ${styles['crumb']}
        ${styles['size-' + props.size]}
    `;
    
    const isSeparator = (index: number) => {
        const lastIndex = props.items.length - 1;
        return index < lastIndex;
    };

    return (
        <div className={`${styles['breadcrumbs']} ${props.className}`}>
            {props.items.map((item, index) =>
                <div
                    className={componentClasses}
                    key={item.id}
                >
                    {item.url &&
                        <Link
                            className={styles['link']}
                            to={item.url}
                        >
                            {item.title}
                        </Link>
                    }

                    {!item.url &&
                        <div className={styles['title']}>{item.title}</div>
                    }

                    {isSeparator(index) &&
                        <div className={styles['separator']}>
                            {props.children.separator}
                            /
                        </div>
                    }
                </div>,
            )}
        </div>
    );
}

export default Breadcrumbs;
import { ReactNode} from 'react';
import styles from 'components/PageWrap/styles.module.sass';

type Props = {
    children?: {
        title?: string,
        text?: ReactNode,
        playground?: ReactNode,
        apiTable: ReactNode
    },
}

function PageWrap(props: Props): JSX.Element {
    return (
        <div className={styles['page-wrap']}>
            <div className={styles.page}>
                <h1 className={styles.title}>{props.children?.title}</h1>

                <p className={styles.text}>{props.children?.text}</p>

                <div className={styles.playground}>{props.children?.playground}</div>

                <div className={styles['api-table']}>{props.children?.apiTable}</div>
            </div>
        </div>
    );
}

export default PageWrap;
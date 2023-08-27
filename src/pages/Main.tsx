import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
import { ReactComponent as IconGithub } from 'assets/icons/github.svg';
import styles from 'pages/Main.module.sass';

function Main() {
    return (
        <div className={styles['main']}>
            <div className={styles['banner']}>ShamUI</div>
            <div className={styles['title']}>React Component Library</div>

            <div className={styles['buttons']}>
                <Link to="/autocomplete">
                    <Button className={styles['button-start']}>GET STARTED</Button>
                </Link>
                
                <a
                    href="https://github.com/code-build-project/sham-ui-react"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button className={styles['button-git']}>
                        <IconGithub className={styles['icon']} />
                        GITHUB
                    </Button>
                </a>
            </div>

        </div>
    );
}

export default Main;
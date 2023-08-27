import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import SidebarMenu from 'components/SidebarMenu';
import styles from 'layouts/MainLayout/styles.module.sass';

function MainLayout() {
    return (
        <div className={styles['layout']}>
            <SidebarMenu />

            <main className={styles['main-block']}>
                <Header />
                <div className={styles['content']}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default MainLayout;
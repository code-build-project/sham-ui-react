import { Link, NavLink } from 'react-router-dom';
import styles from 'components/SidebarMenu/styles.module.sass';
import { ReactComponent as IconArrow } from 'assets/icons/arrow.svg';

function SidebarMenu() {
    type TypeLink = {
        id: string,
        name: string,
        path: string,
    }

    const links: TypeLink[] = [
        { id: 'auto', name: 'Autocomplete', path: '/autocomplete' },
        { id: 'crumbs', name: 'Breadcrumbs', path: '/breadcrumbs' },
        { id: 'button', name: 'Button', path: '/button' },
        { id: 'checkbox', name: 'Checkbox', path: '/checkbox' },
        { id: 'date', name: 'Datepicker', path: '/datepicker' },
        { id: 'file', name: 'FileInput', path: '/file-input' },
        { id: 'modal', name: 'Modal', path: '/modal' },
        { id: 'pagination', name: 'Pagination', path: '/pagination' },
        { id: 'radio', name: 'RadioButton', path: '/radio-button' },
        { id: 'select', name: 'Select', path: '/select' },
        { id: 'table', name: 'Table', path: '/table' },
        { id: 'tabs', name: 'Tabs', path: '/tabs' },
        { id: 'textarea', name: 'Textarea', path: '/textarea' },
        { id: 'text', name: 'TextField', path: '/text-field' },
        { id: 'tooltip', name: 'Tooltip', path: '/tooltip' },
    ];

    return (
        <div className={styles['sidebar']}>
            <div className={styles['header']}>
                <Link to="/">ShamUI</Link>
                <div className={styles['version']}>V 1.0</div>
            </div>

            <div className={styles['components']}>
                <div className={styles['components-title']}>
                    <span>COMPONENTS</span>
                    <span>{links.length}</span>
                </div>

                <div>

                </div>
                {links.map(link =>
                    <NavLink
                        to={link.path}
                        key={link.id}
                        className={({ isActive }) =>
                            `${styles['components-link']} ${(isActive ? styles['components-link_active'] : '')}`
                        }
                    >
                        {link.name}
                        <IconArrow className={styles['components-link-icon']} />
                    </NavLink>,
                )}
            </div>
        </div>
    );
}

export default SidebarMenu;
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import st from './Header.module.scss';

export function Header() {
    const { toggleTheme } = useTheme();
    return (
        <nav className={`${st.nav} box-shadow`}>
            <h1 className='hover-scale'>
                <Link to='/'>Where in the world?</Link>
            </h1>
            <button className={`hover-scale`} onClick={toggleTheme}>
                Dark mode
            </button>
        </nav>
    );
}

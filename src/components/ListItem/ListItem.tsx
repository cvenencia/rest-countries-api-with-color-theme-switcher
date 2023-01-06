import { ReactNode } from 'react';
import st from './ListItem.module.scss';

type ListItemProps = {
    title: string;
    className?: string;
    children: ReactNode;
};

export function ListItem({ className, title, children }: ListItemProps) {
    return (
        <li className={`${st.listItem} ${className}`}>
            <span className='bold'>{title}: </span>
            {children}
        </li>
    );
}

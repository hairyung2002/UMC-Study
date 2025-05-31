import React, { useEffect, useRef } from 'react'

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const sidebarRef = useRef<HTMLDivElement>(null); // 마우스 클릭 이벤트가 사이드바 바깥인지 판단
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                onClose();
            }

        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`sidebar text-white ${isOpen ? '-translate-x-0' : 'translate-x-[-100%]'}`} ref={sidebarRef}>
            <div className='menu'>
                <a href='/search'>찾기</a>
                <br />
                <a href='/mypage'>마이페이지</a>
            </div>
        </div>
    );
};

export default Sidebar;
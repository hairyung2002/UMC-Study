import React from 'react'

export const Sidebar = () => {
    return (
        <div className='sidebar text-white'>
            <h2>돌려돌려 LP판</h2>
            <div className='menu'>
                <a href='search'>찾기</a>
                <br/>
                <a href='mypage'>마이페이지</a>
            </div>
        </div>
    );
};
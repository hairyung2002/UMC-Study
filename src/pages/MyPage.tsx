import React, { useEffect, useState } from 'react'
import { getMyInfo } from '../apis/auth'
import { ResponseMyinfoDto } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LpAddModal from '../components/LpAddModal';
import { AddLpDto, Lp } from '../types/lp';
import { postLp } from '../apis/lp';
import { axiosInstance } from '../apis/axios';

const MyPage = () => {
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyinfoDto>();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        console.log(localStorage.getItem('accessToken'));
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const handleAddLP = async (newLP: { title: string; content: string; tags: string[]; image: File | null }) => {
        try {
            const payload = {
                title: newLP.title,
                content: newLP.content,
                tags: newLP.tags,
                thumbnail: 'https://example.com/default-thumbnail.png',
                published: true,
            };

            const response = await axiosInstance.post('/v1/lps', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('서버 응답:', response.data);
            alert('LP가 성공적으로 등록되었습니다.');
            setIsModalOpen(false);

            const updatedData = await getMyInfo();
            setData(updatedData);
        } catch (error: any) {
            console.error('LP 등록 실패:', error);
            alert('LP 등록에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className='text-white items-center justify-center min-h-screen flex flex-col'>
            <h1>{data?.data.name}님 환영합니다.</h1>
            <img src={data?.data.avatar as string} alt={"구글로고"} />
            <h1>{data?.data.email}</h1>

            <button className='cursor-pointer bg-blue-300 rounded-sm p-4 hover:scale-90' onClick={handleLogout}>로그아웃</button>
            <br />
            <br />
            <button className="fixed bottom-6 right-6 bg-pink-500 w-12 h-12 rounded-full text-2xl text-white shadow-lg text-white"
                onClick={() => setIsModalOpen(true)}>
                +
            </button>

            {isModalOpen && (
                <LpAddModal onClose={() => setIsModalOpen(false)} onAdd={handleAddLP} />
            )}
        </div>
    );
};

export default MyPage;

import React, { useEffect, useRef } from 'react'

const fetchComments = async ({pageParam = 1, lpId}: any) => {
    const res = await fetch(`/v1/lp/${lpId}/comments?page=${pageParam}`);
    return res.json();
}

const LpComment = ({ lpId, onClose }: {lpId: number; onClose:()=>void}) => {
    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
        ['commnets', lpId],
        ({ pageParam = 1}) => fetchComments({ pageParam, lpId }),
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
        }
    );

    const bottomRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage){
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, [hasNextPage]);

    return (
    );
}

export default LpComment;
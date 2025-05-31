import { useParams } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { use, useState } from "react";

const CommentPage = () => {
    const { id } = useParams();
    const [sort, setSort] = useState("latest");
    const [content, setContent] = useState("");
    const queryClient = useQueryClient();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["comments", id, sort],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await fetch(`/v1/lp/${id}/comments?page=${pageParam}`);
            return res.json();
        },
        getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
    });

    const postComment = useMutation({
        mutationFn: async () => {
            await fetch(`/v1/lps/${id}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });
        },
        onSuccess: () => {
            setContent("");
            queryClient.invalidateQueries(["comments", id, sort]);
        }
    })

    return (
        <div className="p-4 text-white bg-black min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl">💬 댓글</h2>
                <div className="space-x-2">
                    <button onClick={() => setSort("latest")} className={sort === "latest" ? "font-bold underline" : ""}>최신순</button>
                    <button onClick={() => setSort("oldest")} className={sort === "oldest" ? "font-bold underline" : ""}>오래된순</button>
                </div>
            </div>

            {/* 댓글 작성 영역 */}
            <div className="mb-4">
                <textarea
                    className="w-full p-2 rounded bg-gray-900 text-white"
                    rows={3}
                    placeholder="댓글을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    onClick={() => postComment.mutate()}
                    className="mt-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
                >
                    작성
                </button>
            </div>

            {/* 댓글 목록 */}
            {data?.pages.map((page) =>
                page.comments.map((comment: any) => (
                    <CommentItem key={comment.id} comment={comment} lpId={id!} />
                ))
            )}

            {/* 더보기 */}
            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                    더 보기
                </button>
            )}
        </div>
    );
};

export default CommentPage;

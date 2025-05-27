import React from 'react'

const LpComment = () => {
    const [comment, setComment] = React.useState<string>('');
    const [comments, setComments] = React.useState<string[]>([]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment('');
        }
    };

    return (
        <div>
            <form onSubmit={handleCommentSubmit}>
                <textarea value={comment} onChange={handleCommentChange} />
                <button type="submit">Add Comment</button>
            </form>
            <ul>
                {comments.map((c, index) => (
                    <li key={index}>{c}</li>
                ))}
            </ul>
        </div>
    )
}

export default LpComment

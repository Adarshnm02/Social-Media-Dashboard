import { useState } from "react";
import { useAppDispatch } from "../app/store";
import { addComment } from "../features/posts/postsSlice";



interface Props {
    postId: string;
}


const CommentForm = ({ postId }: Props) => {
    const [text, setText] = useState('')
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        dispatch(addComment({ postId, comment: { text, id: Date.now().toString(), userId: '1' } }));
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded"
            />
        </form>
    )
}

export default CommentForm

import { useState } from "react"
import { useAppDispatch } from "../app/store"
import { createPost } from "../features/posts/postsSlice";

const PostForm = () => {
    const [content, setContent] = useState('')
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return;
        await dispatch(createPost(content))
        setContent('')
    }


    return (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p=4 rounded-lg shadow-md">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-2 border rounded mb-4"
                rows={3}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Post
            </button>

        </form>
    )
}

export default PostForm

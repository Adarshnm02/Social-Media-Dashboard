import { useState } from "react"
import { useAppDispatch } from "../app/store"
import { createPost } from "../features/posts/postsSlice";
import { Image, Smile, MapPin } from 'lucide-react';

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
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 mt-20"
        >
          <div className="flex space-x-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Current user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full border-0 resize-none h-20"
              />
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex space-x-4">
                  <button type="button" className="text-gray-500 hover:text-blue-500">
                    <Image className="h-5 w-5" />
                  </button>
                  <button type="button" className="text-gray-500 hover:text-blue-500">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button type="button" className="text-gray-500 hover:text-blue-500">
                    <MapPin className="h-5 w-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  disabled={!content.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      );


}

export default PostForm

import { Post } from '../types/types';
import CommentForm from './CommentForm';
// import { useAppDispatch } from '../app/store';
// import { addComment } from '../features/posts/postsSlice';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  // const dispatch = useAppDispatch();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center mb-4">
        <img
          src={post.user.avatar}
          alt={post.user.username}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-bold">{post.user.username}</h3>
          <p className="text-gray-500 text-sm">{post.createdAt}</p>
        </div>
      </div>
      <p className="mb-4">{post.content}</p>
      <div className="border-t pt-4">
        <CommentForm postId={post.id} />
        {post.comments.map((comment) => (
          <div key={comment.id} className="mt-2 p-2 bg-gray-50 rounded">
            <p className="text-sm">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
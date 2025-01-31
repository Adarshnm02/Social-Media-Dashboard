// import { Post } from '../types/types';
// import CommentForm from './CommentForm';
// // import { useAppDispatch } from '../app/store';
// // import { addComment } from '../features/posts/postsSlice';

// interface Props {
//   post: Post;
// }

// const PostCard = ({ post }: Props) => {
//   // const dispatch = useAppDispatch();

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//       <div className="flex items-center mb-4">
//         <img
//           src={post.user.avatar}
//           alt={post.user.username}
//           className="w-10 h-10 rounded-full mr-3"
//         />
//         <div>
//           <h3 className="font-bold">{post.user.username}</h3>
//           <p className="text-gray-500 text-sm">{post.createdAt}</p>
//         </div>
//       </div>
//       <p className="mb-4">{post.content}</p>
//       <div className="border-t pt-4">
//         <CommentForm postId={post.id} />
//         {post.comments.map((comment) => (
//           <div key={comment.id} className="mt-2 p-2 bg-gray-50 rounded">
//             <p className="text-sm">{comment.text}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PostCard;










import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import type { Post } from "../types/types";
import CommentForm from "./CommentForm";
import ShareModal from "./ShareModal";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleAddComment = (content: string) => {
    console.log("Adding comment:", content);
  };

  // Dynamic post height based on content length
  const contentLength = post.content.length;
  const minHeight = "100px";
  const maxHeight = "300px";
  const dynamicHeight =
    contentLength < 50 ? minHeight : contentLength > 200 ? maxHeight : `${contentLength}px`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4" style={{ minHeight, maxHeight }}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            /> */}
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-gray-900">John jackebs</p>  {/*post.author.name*/}
              <p className="text-sm text-gray-500">@johnjackebs32</p> {/*post.author.username*/}
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-gray-800" style={{ height: dynamicHeight, overflow: "hidden" }}>{!post.content? post.content : `Mohanlal has a prolific career spanning over four decades, during which he has acted in more than 400 films. The Government of India honoured him with Padma Shri in 2001, and Padma Bhushan in 2019, India's fourth and third highest civilian honours, for his contributions to Indian cinema.`}</p>

        {post.images && post.images.length > 0 && (
          <div className="mt-4 grid gap-2">
            {post.images.length === 1 ? (
              <img
                src={post.images[0]}
                alt="Post content"
                className="rounded-lg w-full h-auto max-h-80 object-cover"
              />
            ) : post.images.length === 2 ? (
              <div className="grid grid-cols-2 gap-2">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post content ${index + 1}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {post.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post content ${index + 1}`}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              <span>{likesCount}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments.length}</span>
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
            >
              <Share2 className="h-5 w-5" />
              <span>{post.shares? post.shares : '20k'}</span>
            </button>
          </div>
          <span className="text-sm text-gray-500">{post.createdAt}</span>
        </div>
      </div>

      {showComments && (
        <CommentForm comments={post.comments} onAddComment={handleAddComment} />
      )}

      {showShareModal && <ShareModal postId={post.id} onClose={() => setShowShareModal(false)} />}
    </div>
  );
}

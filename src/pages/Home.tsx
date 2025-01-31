import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/store"
import { fetchPosts } from "../features/posts/postsSlice"
import PostForm from "../components/PostForm"
// import PostCard from "../components/PostCard"

const Home = () => {
  const dispatch = useAppDispatch()
  const { posts, status} = useAppSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])
  return (
<div className="max-w-2xl mx-auto p-4">
      <PostForm />
      {status === 'loading' ? (
        <p>Loading posts...</p>
      ) : (
        // posts.map((post) => <PostCard key={post.id} post={post} />)
        <p>Loading posts...</p>
      )}
    </div>
  )
}

export default Home

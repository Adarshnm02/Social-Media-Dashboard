import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/store"
import { fetchPosts } from "../features/posts/postsSlice"
import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard"
import PostSkeleton from "../components/PostSkelton"

const Home = () => {
  const dispatch = useAppDispatch()
  const { posts, status} = useAppSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch])

  // const loadMore = () => {
  //   dispatch(fetchPosts(posts.length / 5 + 1));
  // }

  if (!Array.isArray(posts)) return <p>Error: posts is not an array</p>
  console.log("out", status, posts)

  return (
    <div className="max-w-2xl mx-auto p-4">
      <PostForm />
      {status === 'loading' ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}

      {/* {hasMore && (
        <button
          onClick={loadMore}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Load More
        </button>
      )} */}
    </div>
  );
}

export default Home

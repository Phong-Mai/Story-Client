import { Link } from 'react-router-dom';
// import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
// import PostCard from '../components/PostCard';
import { Spinner } from 'flowbite-react';

import StoryCard from '../components/StoryCard';
import NewStoryUpdate from '../components/NewStoryUpdate';
import StoryCompleted from '../components/StoryCompleted';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  // console.log(process.env.SEVER);
  const a = JSON.parse(localStorage.getItem('persist:root'))
  const b = JSON.parse(a.user)
  console.log(b.currentUser);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://story-sever.vercel.app/api/post/getPosts`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  if (loading)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl' />
    </div>
  );
  return (
    <div className='md:w-[80%] sm:w-full mx-auto'>
      {/* <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
         Tại đây bạn có thể chia sẽ các nội dung mà bạn yêu thích
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          Tất cả bài viết
        </Link>
      </div> */}
      {/* <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div> */}
     
      <div className=' mx-auto p-3 flex flex-col gap-2 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Truyện Hot</h2>
            <div className='grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-1 gap-3'>
              {posts.map((post) => (
                <StoryCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
            </Link>
          </div>
        )}
      </div>
      <NewStoryUpdate posts={posts ?? posts}/>
      <StoryCompleted posts={posts} />
   
    </div>
  );
}

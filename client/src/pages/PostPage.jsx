import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { Pagination } from "flowbite-react";
import StorySameAuthor from '../components/StorySameAuthor';

export default function PostPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(50)
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [showText, setShowText] = useState(false)
  const [titleChapter, setTitleChapter] = useState(null)
  const introduce = post?.introduce;
  const [sliceIntroduce, setSliceIntroduce] = useState(introduce)
  const [recentPosts, setRecentPosts] = useState(null);
  // const a = postSlug.replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D');
  const lastpostIndex = currentPage * postPerPage;
  const firstPostindex = lastpostIndex - postPerPage
  const postPage = titleChapter?.slice(firstPostindex,lastpostIndex)
  console.log(postSlug);
  const onPageChange = (page) => setCurrentPage(page);
  const handleButton = () => {
    setCurrentPage(Math.ceil(titleChapter?.length/postPerPage))
  }
  const handleSliceText = () => {
    setShowText(true)
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
useEffect(() => {
  const fetchtitlechapter = async () => {
    try {
      // setLoading(true);
      const res = await fetch(`/api/chapters/gettitlechapter?slug=${postSlug}`);
      const data = await res.json();
      if (!res.ok) {
        // setError(true);
        // setLoading(false);
        return;
      }
      if (res.ok) {
        setTitleChapter(data.posts);
        // setLoading(false);
        // setError(false);
      }
    } catch (error) {
      // setError(true);
      // setLoading(false);
    }}
    fetchtitlechapter()
},[postSlug])

  // useEffect(() => {
  //   try {
  //     const fetchRecentPosts = async () => {
  //       const res = await fetch(`/api/post/getposts?limit=3`);
  //       const data = await res.json();
  //       if (res.ok) {
  //         setRecentPosts(data.posts);
  //       }
  //     };
  //     fetchRecentPosts();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <div className='lg:w-[80%] md:w-[80%] sm:w-full mx-auto'>
        <div className='grid lg:grid-cols-12 gap-0 sm:grid-cols-12 md:grid-cols-12'>
        <div className='lg:col-span-4 md:col-span-12 sm:col-span-12 flex flex-col items-center justify-center'>
        {/* <img
         src={post && post.image}
         alt={post && post.title}
         className='mt-10 w-48 h-32  object-cover justify-center items-center rounded-lg shadow-md '
       />  */}
       <div className="relative mt-6">
       <div className="w-[320px] h-[390px] bg-[#EFEFEF] border-r-8 border-zinc-950 shadow-md drop-shadow-2xl "></div>
       <img  src={post && post.image} alt={post && post.title} className="absolute bottom-[-5px] left-0 w-[300px] h-[400px] object-cover border-gray-800 border-l-[6px] border-[1px]   shadow-inner- drop-shadow-2xl" />
     </div>
      <div className='pt-5 flex flex-col items-center justify-center'>
         <p className='text-xl justify-center'>Tác Giả : {post && post.author}</p> 
         <p className='text-xl justify-center text-center'>Thể loại : {post && post.category}</p> 
         <p className='text-xl '>Trạng thái : {post?.status}</p> 
         </div>
        </div>
          <div className='lg:col-span-5 md:col-span-12 sm:col-span-12 text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl'>
         <h1 className='pb-2'>{post && post.title}</h1><hr/>
       
         <p
         className='p-2 items-start text-lg max-w-2xl mx-auto w-full md:hidden lg:hidden'
         dangerouslySetInnerHTML={{ __html: post?.introduce && showText ? introduce : post?.introduce.length > 300 ? post?.introduce.slice(0, 300) : post?.introduce  }}
       >
       </p>
       <p
         className='p-2 items-start text-lg max-w-2xl mx-auto w-full hidden md:block lg:block post-content'
         dangerouslySetInnerHTML={{ __html: post?.introduce && post?.introduce }}
       ></p>
       <p onClick={handleSliceText} className='text-xl text-right text-[blue]  md:hidden lg:hidden'>{showText ? '' : 'xem thêm'}</p>
       </div>
       <div className='lg:col-span-3 md:col-span-12   lg:block sm:col-span-12 mt-10 p-3  '>
       <StorySameAuthor post={post}/>
       
       </div>
       {/* <Link
         to={`/search?category=${post && post.category}`}
         className='self-center mt-5'
       >
         <Button color='gray' pill size='xs'>
           {post && post.category}
         </Button>
       </Link> */}
      
          
        </div>

        <hr className='py-2'/>
        <h1 className='font-bold text-3xl p-3'>Danh Sách Chương</h1>
       <div className='mt-5 p-2 grid md:grid-cols-2 sm:grid-cols-1'>
        {postPage?.map((e, index) => (
          <Link to={`/${post?.slug.replace(/\s+/g, "-")}/Chuong${e.chaptersNumber}`} key={index} className='hover:cursor-pointer '>
            <p className='text-sm py-2 text-zinc-500 font-bold hover:text-red-700' key={index}>*<span key={index}> {e?.title}</span></p>
          </Link>
         
        ))} 
       </div>
     
       <div className="flex overflow-x-auto justify-center">
      <Pagination currentPage={currentPage} totalPages={Math.ceil(titleChapter && titleChapter?.length/postPerPage)} onPageChange={onPageChange} />
    </div>
 <div className='flex justify-center py-1'>
 <Button onClick={handleButton}>Chương cuối</Button>
 </div>
 <div className=' justify-start'><CommentSection postId={post?._id} /></div>
 

    </div>
    // <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    //   <h1 className='text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl'>
    //     {post && post.title}
    //   </h1>
    //   <Link
    //     to={`/search?category=${post && post.category}`}
    //     className='self-center mt-5'
    //   >
    //     <Button color='gray' pill size='xs'>
    //       {post && post.category}
    //     </Button>
    //   </Link>
    //   <img
    //     src={post && post.image}
    //     alt={post && post.title}
    //     className='mt-10 p-3 max-h-[600px] w-full object-cover'
    //   />
    //   <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
    //     <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
    //     <span className='italic'>
    //       {post && (post.content.length / 1000).toFixed(0)} mins read
    //     </span>
    //   </div>
    //   <div
    //     className='p-3 max-w-2xl mx-auto w-full post-content'
    //     dangerouslySetInnerHTML={{ __html: post && post.content }}
    //   ></div>
   
    //   <CommentSection postId={post._id} />

    //   <div className='flex flex-col justify-center items-center mb-5'>
    //     <h1 className='text-xl mt-5'>Recent articles</h1>
    //     <div className='flex flex-wrap gap-5 mt-5 justify-center'>
    //       {recentPosts &&
    //         recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
    //     </div>
    //   </div>
    // </main>
  );
}

import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Select } from 'flowbite-react';

export default function Chapter() {
  const { postSlug, postChapter } = useParams();
  const navigate = useNavigate()
  const regex = /\d+/;
  const num = postChapter?.match(regex);
  const [nextPage, setNextPage] = useState(num)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [titleChapter, setTitleChapter] = useState()
  console.log(post);
  const handleNextPage = () => {
    if (Number(nextPage) == post.content.length) {
      return
    }
    setNextPage(Number(nextPage) + 1)
    navigate(`/${postSlug}/Chuong${Number(nextPage) + 1}`)
  }
  const handlePreviousPage = () => {
    if (Number(nextPage) == 1) {
      return
    }
    setNextPage(Number(nextPage) - 1)
    navigate(`/${postSlug}/Chuong${Number(nextPage) - 1}`)
  }
  const handleChangeSelect = (e) => {
    setNextPage(Number(e))
    navigate(`/${postSlug}/Chuong${Number(e)}`)

  }

  // const a = nextPage.replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D');
  // const contentChapter = post?.content[Number(nextPage) -1]

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://story-sever.vercel.app/api/chapters/getchapter?slug=${postSlug}&&chaptersNumber=${parseInt(num)}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postChapter]);
  useEffect(() => {
   const fetchTitleChapter = async () => {
      try {
        const res = await fetch(`https://story-sever.vercel.app/api/chapters/gettitlechapter?slug=${postSlug}`);
        const data = await res.json();
        if (res.ok) {
          setTitleChapter(data.posts);
        
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchTitleChapter()
  },[])


  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <div className='lg:w-[80%] sm:w-full  mx-auto'>
      <div className='flex flex-col justify-center items-center '>
        <h1 className='pt-10 pb-5 text-2xl md:text-4xl text-center'>  {post?.title}</h1>
        {/* <p className='py-2 text-xl text-center'>Chương {Number(nextPage)} : {contentChapter?.title}</p> */}
        <div className='flex gap-2 p-2'>
          <Button className='h-10' onClick={handlePreviousPage}>Chương trước</Button>
          <Select
            onChange={(e) =>
              handleChangeSelect(e.target.value)
            }
          >
            <option value={nextPage}>Chương {nextPage}</option>
            {titleChapter?.map((e, index) => (
              <option key={Number(index)} value={Number(index) + 1}>Chương {e.chaptersNumber}</option>
        ))}

          </Select>
          <Button className='h-10' onClick={handleNextPage}>Chương Tiếp</Button>
        </div>
        <div
          className='p-3 text-justify leading-loose gap-5 mt-3 text-3xl mx-auto w-full post-content'
          dangerouslySetInnerHTML={{ __html: post?.content && post?.content }}
        ></div>
        <div className='flex gap-2 p-2 mb-2'>
          <Button className='h-10' onClick={handlePreviousPage}>Chương trước</Button>
          <Select
            onChange={(e) =>
             handleChangeSelect(e.target.value)
            }
          >
            <option value={nextPage}>Chương {nextPage}</option>
        {titleChapter?.map((e, index) => (
              <option key={Number(index)} value={Number(index) + 1}>Chương {e?.chaptersNumber}</option>
        ))}
            
          </Select>
          <Button className='h-10' onClick={handleNextPage}>Chương Tiếp</Button>
        </div>
      </div>

      {/* <div className='flex flex-col justify-center items-center mb-5'>
         <h1 className='text-xl mt-5'>Recent articles</h1>
         <div className='flex flex-wrap gap-5 mt-5 justify-center'>
           {recentPosts &&
             recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
         </div>
       </div> */}
    </div>

  );
}

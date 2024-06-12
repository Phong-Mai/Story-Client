import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


export default function StorySameAuthor({post}){
    const title = post?.title
    const param = useParams()
    const [postAuthor, setPostAuthor] = useState([])
    const newPostAuthor = postAuthor.filter((a) => {
        return a.title != title
    })

    useEffect(() => {
        const fetchAuthorPost = async () => {
          try {
            const res = await fetch(`https://story-sever.vercel.app/api/post/getposts?author=${post?.author}`);
            const data = await res.json();
            if (!res.ok) {
         
              return;
            }
            if (res.ok) {
              setPostAuthor(data.posts);
           
            }
          } catch (error) {
           console.log(error);
          }
        };
        fetchAuthorPost();
      }, [param]);
    return (
        <div>
        <ul className=' p-6 w-full bg-[#6E72F6] flex flex-col items-left'>
          <h1 className='font-bold text-2xl  py-2'>Truyện cùng tác giả</h1>
          {newPostAuthor ? newPostAuthor?.map((post, index) => (
                <li key={index} className='py-1 text-gray-900 font-medium hover:text-fuchsia-300'>
                    <Link to={`/${post.slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D').replace(/\s/g, '-')}`}>{post?.title}</Link> <hr className='my-1'/>
                </li>
          )): ''}
        </ul>
        <h1 className='font-bold text-2xl mt-20 p-6'>Truyện Đang Hot</h1>
        <div className='flex gap-5 px-6 items-center'>
            <div className='rounded-full bg-orange-500 w-8 h-8 flex justify-center items-center text-white'>1</div>
            <div>
                <h1 className=' text-lg font-medium text-sky-400'>Thế Giới Hoàn Mỹ</h1>
                <p className=' text-gray-500'>Tiên Hiệp</p>
            </div>
        </div>

        </div>
    )
}
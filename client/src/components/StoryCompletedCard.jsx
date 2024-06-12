import { Link } from 'react-router-dom';

export default function StoryCompletedCard({ post }) {
  const a = post?.slug.replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D')
  return (
    <div className='h-[350px] flex flex-col justify-between'>
        <div className='group relative w-full border border-teal-500 hover:border-2 h-[250px] overflow-hidden rounded-lg  transition-all'>
      <Link to={`/${a}`}>
        <img
          loading='lazy'
          src={post?.image}
          alt={post?.title}
          className='h-full w-full  object-cover hover:scale-105 transition-all duration-300'
        />
      </Link>
     
    </div>
    
     <Link className='text-ellipsis text-center whitespace-nowap text-sm  font-bold text-black'>{post?.title}</Link>
     <Link className=' bg-lime-200 text-ellipsis text-center whitespace-nowrap p-1 mb-2 font-bold text-black font-semibol'>Full - {post?.__v} chương</Link>
     {/* <span className='italic text-sm'>{post.category}</span> */}
     {/* <Link
       to={`/${post.slug}`}
       className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
     >
       Read article
     </Link> */}
 
    </div>
  );
}

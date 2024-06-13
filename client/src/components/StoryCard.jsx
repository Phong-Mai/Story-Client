import { Link } from 'react-router-dom';

export default function StoryCard({ post }) { 
  const a = post?.slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D').replace(/\s/g, '-')

  

  return (
    <div className='group relative border border-teal-500 hover:border-2 h-[250px] overflow-hidden rounded-lg  transition-all '>
      <Link to={`/${a}`}>
        <img
          loading='lazy'
          src={post?.image}
          alt={post?.title}
          className='h-full w-full relative object-cover hover:scale-105 transition-all duration-300'
        />
      </Link>
      <div className=' absolute bottom-2 p-3 flex flex-col gap-2'>
        <p className='text-sm font-semibold text-slate-100 line-clamp-2'>{post?.title}</p>
       
        {/* <span className='italic text-sm'>{post.category}</span> */}
        {/* <Link
          to={`/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link> */}
      </div>
    </div>
    
  );
}

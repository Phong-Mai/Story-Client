
import { FaBookOpen } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { GrChapterAdd } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function CategoryCard({posts}) {
  return (
    <div className=" px-2">
    <div className="flex items-center">
   
   <Link to={`/${posts?.slug}`}>
   <img
    className=" h-[100px] w-[100px] md:h-[100px] md:w-[100px] lg:w-[200px] object-cover border rounded" 
    src={posts?.image} 
    alt={posts?.title}/></Link>
      <div className="p-2 text-left  hover:text-orange-400">
        <div className="flex items-center gap-2"><FaBookOpen/> <Link to={`/${posts?.slug}`} className="text-sm font-bold">{posts?.title}</Link></div>
        <div className="flex items-center py-1 gap-2"><IoPencil/> <Link to={`/${posts?.slug}`} className="text-sm ">{posts?.author}</Link></div>
        <div className="flex items-center gap-2"><GrChapterAdd/> <Link to={`/${posts?.slug}`} className="text-sm">{posts?.__v} chương</Link></div>
       {/* <p> Tác giả : {posts?.author}</p>
    <p>  Thể loại : {posts?.category}</p> */}
      </div>
    </div>
    </div>
  )
}



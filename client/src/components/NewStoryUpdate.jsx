import moment from 'moment';
import '../../src/locale/vi'
import { Link } from "react-router-dom";
export default function NewStoryUpdate ({posts}){
  console.log(posts);
    return (
        <div className=' mx-auto p-3 flex flex-col gap-8 py-7'>
          <h1 className=" font-bold text-xl">Truyện mới cập nhật</h1>
        <table className="table w-full bg-white border-collapse rounded-lg shadow-md">
  <thead>
    <tr>
      <th className="text-center p-2 font-bold  border hidden md:block">Chương</th>
      <th className="text-center p-2 font-bold  border">Truyện</th>
      <th className="text-center p-2 font-bold  border">Thể loại</th>
   
      <th className="text-center p-2 font-bold  border hidden md:block">Cập nhật</th>
    </tr>
  </thead>
  <tbody>
   
      {posts?.map((post, i) => (
         <tr key={i}>
        <td  className="text-center p-2 border hidden md:block">Chương {post?.__v}</td>
        <td className="text-center p-2 border"><Link className=" hover:text-orange-400" to={`/${post?.slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, m => m === 'đ' ? 'd' : 'D').replace(/\s/g, '-')}`}>{post.title}</Link></td>
        <td className="text-center p-2 border">{post?.category}</td>
        <td className="text-center p-2 border hidden md:block">  {moment(post?.updatedAt).fromNow()}</td>
        </tr>
      ))}
   
    </tbody>
</table>
      </div>
    )
}
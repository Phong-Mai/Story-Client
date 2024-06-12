import { useParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { useEffect, useState } from 'react';

export default function Category() {
    const param = useParams()
   
    const [posts, setPosts] = useState([]); 
    console.log(posts); 
    const category = param?.category === "Tien-Hiep" ? "Tiên Hiệp" : param.category === "Xuyen-Khong" ? "Xuyên Không" : param.category === "Kiem-Hiep" ? 
    "Kiếm Hiệp" : param.category === "Ngon-Tinh" ? "Ngôn Tình" : param.category === "Bach-Hop" ? "Bách Hợp" : param.category === "Hai-Huoc" ? "Hài Hước" :
    param.category === "Trong-Sinh" ? "Trọng Sinh" : param.category === "Dam-My" ? "Đam Mỹ" : param.category === "Trinh-Tham" ? "Trinh Thám" : param.category === "Co-Dai" ?
    "Cổ Đại" : param.category === "Quan-Truong" ? "Quan Trường" : param.category === "Tham-Hiem" ? "Thám Hiểm" : param.category === "Mat-The" ? "Mạt Thế" : 
    param.category === "Linh-Di" ? "Linh Dị" : param.category === "Truyen-Teen" ? "Truyện Teen" : param.category === "Phuong-Tay" ? "Phương Tây" : param.category === "Khoa-Huyen" ?
    "Khoa Huyễn" : param.category === "Huyen-Huyen" ? "Huyền Huyễn" : param.category === "Cung-Dau" ? "Cung Đấu" : param.category === "Light-Novel" ? "Light Novel" :
    param.category === "Di-Gioi" ? "Dị Giới" : param.category === "Nu-Cuong" ? "Nữ Cường" : param.category === "Viet-Nam" ? "Việt Nam" : param.category === "Di-Nang" ?
    "Dị Năng" : param.category === "Quan-Su" ? "Quân Sự" : param.category === "Lich-Su" ? "Lịch Sử" : param.category === "Do-Thi" ? "Đô Thị" : ''
    useEffect(() => {
       
        const fetchPosts = async () => {
          const res = await fetch(`https://story-sever.vercel.app/api/post/getcategory?category=${category}`);
          const data = await res.json();
          setPosts(data.posts);
        };
        fetchPosts();
      }, [category]);
  return (
    <div className="md:w-[80%] min-h-screen sm:w-full mx-auto grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 my-10 gap-2">
        {posts.map((posts ,i) => (
            <CategoryCard key={i} posts={posts}/>
        ))}
      
    </div>
  )
}



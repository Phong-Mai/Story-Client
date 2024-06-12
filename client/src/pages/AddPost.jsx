import { Alert, Button, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import { useEffect, useState } from 'react';

import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import data from '../data.json'
export default function AddPost() {
  const [index, setIndex] = useState(0)
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data1 = await res.json();
        if (!res.ok) {
          console.log(data1.message);
          setPublishError(data1.message);
          return;
        }
        if (res.ok) {
         
          setPublishError(null);
          setFormData(data1.posts[0]);    
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  const handleSubmit = async () => {
    // e.preventDefault();
    setIndex((prev) => prev + 1)
    const a = data.shift();
    const newForm = {slug : formData?.slug, content: a.content, title: a.titleChapter, chaptersNumber: 1976 - data.length}
    try {
      const res = await fetch('/api/chapters/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newForm),
      });
      // update _v mỗi khi thêm chapter mới
      // await fetch(`/api/post/addpost/${formData._id}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newForm),
      // });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        // navigate(`/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
    // try {
    //       // const form = {...formData, content : data[0].content[index]};
    //   const res = await fetch(`/api/post/addpost/${formData._id}/${currentUser._id}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newForm),
    //   });
    //   if(res.ok) {
    //     setIndex((prev) => prev +1);
    //   }
    //   if (!res.ok) {
    //     setPublishError(data.message);
    //     return;
    //   }
    //   if (data.length <= 0) {
    //     console.log('Reached the end of data');
    //     return; // Exit if there's no more data to add
    //   }
    //   setPublishError(null);
    // } catch (error) {
    //   setPublishError('Something went wrong');
    // }
    
  };
  const handleAuto = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const intervalId = setInterval(() => {
       handleSubmit();
      
       if(data.length  <= 0) {
        clearInterval(intervalId)
      }
    }, 1000);
  };
  // const handleAuto = (e) => {
  //   e.preventDefault(); // Prevent default form submission behavior
  
  //   let submittedCount = 0; // Track number of successful submissions
  
  //   const submitContent = async (content) => { // Helper function for submission
  //     const newForm = { ...formData, content };
  //     try {
  //       await handleSubmit(newForm);
  //       submittedCount++;
  //     } catch (error) {
  //       console.error('Error submitting content:', error);
  //     }
  
  //     if (submittedCount >= data[0].content.length) { // Check after each submission
  //       clearInterval(intervalId);
  //     }
  //   };
  
  //   const intervalId = setInterval(async () => {
  //     const a = data[0].content.shift();
  //     if (a) { // Check if there's content to submit
  //       await submitContent(a);
  //     }
  //   }, 1000);
  // };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>add post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        {formData.title}
          {/* <TextInput
            type='text'
            placeholder='Title'
            required
            id='titleChapter'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, content : data[0].content[1]})
            }
           
          /> */}
        
        </div>
        {/* <ReactQuill
          theme='snow'
          placeholder='Thêm nội dung'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: {content : value, titleChapter : formData?.content?.titleChapter} });
          }}
        /> */}
        <Button onClick={handleSubmit} gradientDuoTone='purpleToPink'>
          add post
        </Button>
        <Button onClick={handleAuto} gradientDuoTone='purpleToPink'>
          cap nhat tu dong
        </Button>
       
        <p>Chương {index}</p>
        {formData?.content?.length > 0 && formData?.content?.content}
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}

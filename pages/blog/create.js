import {useState} from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import {useRouter} from 'next/router'

import BlogForm from "../../components/blogform";

const Blog = () => {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const router = useRouter();

    const blogSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/create-blog`, { content, author });
          console.log("create post response => ", data);
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("Blog created");
            setContent("");
            setAuthor("");
            router.push('/')
          }
        } catch (err) {
          console.log(err);
        }
      };


    return ( 
        <div className="container-fluid">
            <div className='row py-5 text-light'>
                <div className='col text-center'>
                    <h1>Write your blog</h1>
                </div>
            </div>
            <div className='row py-3'>
                <div className='col-md-12'>
                    <BlogForm
                        content={content}
                        setContent={setContent}
                        blogSubmit={blogSubmit}
                        author={author}
                        setAuthor={setAuthor}
                    />

                </div>
            </div>
        </div>
    );
}
 
export default Blog;

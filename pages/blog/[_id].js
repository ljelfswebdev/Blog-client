import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import BlogForm from '../../components/blogform';

const EditPost = () => {
    const [ blog, setBlog] = useState({});

    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    
    const router = useRouter();
    const _id = router.query._id;

    useEffect(() => {
        if(_id) fetchBlog();
    }, [_id]);

    const fetchBlog = async () => {
        try{
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-blog/${_id}`);
            setBlog(data);
            setContent(data.content);
        } catch (err) {
            console.log(err)
        }
    }

    const blogSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`${process.env.NEXT_PUBLIC_API}/edit-blog/${_id}`, {content});
            if(data.error){
                toast.error(error)
            } else {
                toast.success('Blog Updated')
                router.push('/')
            }
        } catch(err){
            console.log(err)
        }
    };
    return ( 
           <div className="container-fluid">
                <div className="row py-5 bg-default-image text-light">
                        <div className="col text-center">
                            <h1>Update Blog</h1>
                        </div>
                </div>
                <div className="row py-3">
                    <div className="col-md-8 offset-md-2">
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
 
export default EditPost;
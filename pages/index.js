import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from 'react'
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify'

const Home = () => {
  const [blogs, setBlogs] = useState ([]);
  const router = useRouter()

  const getBlogs = async () => {
    try{
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-blogs`);
      setBlogs(data)
    } catch (err){
        console.log(err)
    }
  };

  useEffect(() => {
    getBlogs(setBlogs)
  },[]);

  const handleDelete = async (blog) => {
    try {
      const answer = window.confirm('Are you sure you want to delete?')
      if(!answer) return;
      const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_API}/delete-blog/${blog._id}`);
      toast.error('Blog deleted');
      getBlogs();
    } catch (err){
      console.log(err)
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Lewis Jelfs | Blog</title>
        <meta name="description" content="Blog site created by Lewis Jelfs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container-fluid'>
        <div className="row py-5">
          <div className="col text-center">
            <h1>Blogs</h1>
          </div>
        </div>
        <div className='row py-3'>
          <div className='col-md-12 text-center'>
            {blogs.map((blog) => (
              <div key={blog._id} className="card mb-5">
                <div className="card-header">
                  <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                    {blog.author}
                  </span>
                </div>
                <div className="card-body">{blog.content}</div>
                <div className="card-footer justify-content-between">
                  <span >{moment(blog.createdAt).fromNow()}</span>
                  <div className='justify-content-between p-2'>
                    <span className='p-3'>
                      <Link href={`/blog/${blog._id}`}>
                        <a><button className='btn btn-info col-2'>Edit</button></a>
                      </Link>             
                    </span>
                    <span className='p-3'>
                      <button className='btn btn-danger col-2' onClick={() => handleDelete(blog)}>Delete</button>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>    
        </div>  
      </div>
    </div>
  )
};

export default Home;
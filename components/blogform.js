const BlogForm = ({content, setContent, author, setAuthor, blogSubmit}) => {
    return ( 
        <div className="card">
            <div className="card-body pb-3">
                <form className="form-group">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-control"
                    placeholder="Write something..."
                ></textarea>
                </form>
                <input type="text" className="form-control" placeholder="Written by" value={author} onChange={(e) => setAuthor(e.target.value)}/>            </div>
             <div className="card-footer d-flex justify-content-between text-muted">
                <button
                disabled={!author}
                onClick={blogSubmit}
                className="btn btn-primary btn-sm mt-1"
                >
                Post
                </button>
            </div>
        </div>

    );
}
 
export default BlogForm;
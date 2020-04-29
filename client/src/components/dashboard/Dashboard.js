import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPosts } from '../../actions/post'
import PostForm from '../posts/PostForm'
import Moment from 'react-moment'
import Pagination from '../pagination/Pagination'
// import 'moment-timezone';

const Dashboard = ({getPosts, post: {posts, loading} }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        getPosts()
    }, [getPosts, currentPage, postsPerPage])

    const [displayForm, toggleForm] = useState(false)
    
    //Get current users
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return loading ? <Spinner /> :(
        <Fragment>
            <h1 className="text-primary">Temperature records</h1>
            <div className="my-2">
                <button onClick={()=>toggleForm(!displayForm)} type="button" className="btn btn-primary">
                   Add new Record
                </button>
            </div>
            {displayForm && <PostForm />}
            <div className="table-wrap">
                <table className="table data-table table-responsive">
                    <thead>
                        <tr>
                        <th>Employee full name</th>
                        <th>Author</th>
                        <th>City</th>
                        <th>Temperature</th>
                        <th>Comment</th>
                        <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map(post =>{
                       return (
                        
                                <tr key={post._id}>
                                        <th>{post.employee_name}</th>
                                        <td>{post.author}</td>
                                        <td>{post.city}</td>
                                        <td className={`${  post.temp > 36.6 && post.temp < 37.5 ? 'bg-warning' 
                                        :  post.temp > 37.5 ? 'bg-danger' : 'bg-success'}`}>{post.temp}</td>
                                        <td>{post.comment}</td>
                                        <td><Moment format="DD-MMM-YYYY HH:mm:ss">{post.date }</Moment></td>
                                </tr>
                        )})}
                    </tbody>
                </table>
            </div>
            <Pagination 
                postsPerPage={postsPerPage} 
                totalPosts={posts.length} 
                paginate={paginate}
                currentPage={currentPage}
            />
        </Fragment>
    )
}

Dashboard.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps= state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts } )(Dashboard)
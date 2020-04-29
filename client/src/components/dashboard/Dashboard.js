import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPosts } from '../../actions/post'
import PostForm from '../posts/PostForm'
import Moment from 'react-moment'
import 'moment-timezone';

const Dashboard = ({getPosts, post: {posts, loading} }) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])

    return loading ? <Spinner /> :(
        <Fragment>
            <h1 className="text-primary">Temperature records</h1>
           
            <PostForm />
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
                    {posts.map(post =>{
                       return (
                        
                                <tr key={post._id}>
                                        <th>{post.employee_name}</th>
                                        <td>{post.author}</td>
                                        <td>{post.city}</td>
                                        <td>{post.temp}</td>
                                        <td>{post.comment}</td>
                                        <td><Moment format="DD-MMM-YYYY HH:mm:ss">{post.date }</Moment></td>
                                </tr>
                        )})}
                    </tbody>
                </table>
            </div>
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
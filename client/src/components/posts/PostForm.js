import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect} from 'react-redux'
import { addPost } from '../../actions/post'


const PostForm = ({addPost}) => {
    const [formData, setFormData] = useState({
        temp: '',
        comment: '',
        city: '',
        employee_name: ''
    })
    const { temp, comment, city, employee_name } = formData;

    const onChange = e =>  setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
            <form 
            onSubmit={e=>{
            e.preventDefault();
            addPost({ ...formData });
            setFormData({
                temp: '',
                comment: '',
                city: '',
                employee_name: ''
            })
        }}
            className="form my-1 post-form">
                <div className="form-group">
                    <input type="text" placeholder="* Employee full name" name="employee_name" value={employee_name} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Body temperature" name="temp" value={temp} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="City e.g. Kyiv" name="city" value={city} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Leave a comment" name="comment" value={comment} onChange={e=>onChange(e)}/>
                </div>
                <input type="submit" className="btn btn-dark my-1 post-submit" defaultValue="Submit" />
            </form>

    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null,{ addPost })(PostForm)
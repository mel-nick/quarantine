import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect} from 'react-redux'
import { addPost } from '../../actions/post'

import PlacesAutocomplete, {
    geocodeByAddress
  } from "react-places-autocomplete";

const PostForm = ({addPost}) => {

    const [formData, setFormData] = useState({
        temp: '',
        comment: '',
        employee_name: ''
    })
    const [city, setCity] = useState("");
    
    const handleCitySelect = async value => {
      await geocodeByAddress(value);
      setCity(value);
    };

    const { temp, comment, employee_name } = formData;


    const onChange = e =>  setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
            <form 
            onSubmit={e=>{
            e.preventDefault();
            addPost({ ...formData, city: city });
            setCity('');
            setFormData({
                temp: '',
                comment: '',
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
                    <PlacesAutocomplete
                        value={city}
                        onChange={setCity}
                        onSelect={handleCitySelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input {...getInputProps({ placeholder: "City e.g. Kyiv" })} />
                        <div>
                        {loading ? <div>...loading</div> : null}

                        {suggestions.map(suggestion => {
                        const style = {
                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                        };

                            return (
                            <div {...getSuggestionItemProps(suggestion, { style })}>
                                {suggestion.description}
                            </div>
                            );
                        })}
                            </div>
                        </div>
                    )}
                    </PlacesAutocomplete>
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
import React, {useState, Fragment} from 'react'
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

    const searchOptions = {
        componentRestrictions:  {country: "UA"}
      }

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
                    <input type="text" 
                           placeholder="* Employee full name" 
                           name="employee_name" 
                           value={employee_name} 
                           onChange={e=>onChange(e)}
                           autoComplete="off"
                           required 
                    />
                </div>
                <div className="form-group">
                    <input type="number" step="any" 
                            placeholder="* Body temperature" 
                            name="temp" value={temp} 
                            onChange={e=>onChange(e)}
                            autoComplete="off"
                            required 
                    />
                </div>
                <div className="form-group">
                    <PlacesAutocomplete
                        value={city}
                        onChange={setCity}
                        onSelect={handleCitySelect}
                        searchOptions={searchOptions}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                            console.log(suggestions)
                            return(
                            <Fragment>
                            <input {...getInputProps({ placeholder: "City e.g. Kyiv" })} />
                            
                            <div className="d-down">
                                {loading ? <div>...loading</div> : null}
                                    {suggestions.map(suggestion => {
                                    const style = {
                                            backgroundColor: suggestion.active ? "#41b6e6" : "#f4f4f4",
                                            margin:"2px 5px" 
                                    };

                                        return (
                                        <div {...getSuggestionItemProps(suggestion, { style })}>
                                            {suggestion.description}
                                        </div>
                                        );
                                    })}
                            </div>
                        </Fragment>
                    )}}
                    </PlacesAutocomplete>
               </div>
                <div className="form-group">
                    <input type="text" 
                            placeholder="Leave a comment" 
                            name="comment" 
                            value={comment} 
                            onChange={e=>onChange(e)}
                            autoComplete="off"
                    />
                </div>
                <input type="submit" className="btn btn-dark my-1 post-submit" defaultValue="Submit" />
            </form>

    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null,{ addPost })(PostForm)
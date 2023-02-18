import './SearchBar.css';

import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


export function SearchBar() {

    const [term, setTerm] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        //redirect at the homepage with the query
        history.push(`/search?q=${term}`)
    }

  return (
    <div className='searchbar'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='search'>Search:</label>
            <input 
            type="text"
            id='search'
            onChange={(e) => setTerm(e.target.value)}
            />  
        </form>
    </div>
  )
}
import { useState, useEffect } from 'react'
import RecipeList from "../../components/RecipeList"

import { getData } from "../../firebase/config"

// styles
import './Home.css'

export default function Home() {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {        
        setIsPending(true)
        getData("recipes")
            .then(data => {
                setData(data);
                setIsPending(false);
            })
            .catch(error => {
                setError(error.message);
                setIsPending(false);
            });
    }, [])

    return (
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}
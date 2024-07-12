import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme"
import { getDataById, updateById } from "../../firebase/config"

// styles
import './Recipe.css'

export default function Recipe() {
    const { id } = useParams()
    const { mode } = useTheme()

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        setIsPending(true)

        getDataById("recipes", id)
            .then(data => {
                console.log("recipes data:", data)
                setRecipe(data)
                setIsPending(false)
            })
            .catch(error => {
                setError(error)
                setIsPending(false)
            })

    }, [id])

    async function handleClick() {
        // props to get new name
        const title = prompt("Please enter your new recipe name:", recipe.title)
        // set the update data
        const updateData = { title }
        // set the useState recipe
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            title
        }))
        // update data
        const result = await updateById("recipes", id, updateData)
        console.log("update result: ", result)
    }

    return (
        <div className={`recipe ${mode}`}>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {recipe && (
                <>
                    <h2 className="page-title">{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook.</p>
                    <ul>
                        {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                    <p className="method">{recipe.method}</p>
                    <button onClick={handleClick}>Updata me</button>
                </>
            )}

        </div>
    )
}
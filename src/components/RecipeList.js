import { useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../hooks/useTheme"
import { deleteData } from "../firebase/config"
import Trashcan from "../assets/trashcan.svg"

// styles
import './RecipeList.css'

export default function RecipeList(props) {
    // set props to a useState, because firebase delete data cannot get the new data
    const [recipes, setRecipes] = useState(props.recipes);
    // get the mode from useContext
    const { mode } = useTheme()

    // delete recipe
    async function handleClick(id) {
        deleteData("recipes", id)
            .then(() => {
                setRecipes(recipes.filter(recipe => recipe.id !== id))
                console.log("delete success")
            })
            .catch(error => {
                console.log(error);
            })
    }
    console.log("recipes numbers: ", recipes.length)

    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div key={recipe.id} className={`card ${mode}`}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.</p>
                    <div>{recipe.method.substring(0, 100)}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
                    <img
                        className="delete"
                        src={Trashcan}
                        alt="delete icon"
                        onClick={() => handleClick(recipe.id)}
                    />
                    <div></div>
                </div>
            ))}
        </div>
    )
}
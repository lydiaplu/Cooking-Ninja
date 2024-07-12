import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { addData } from "../../firebase/config"

// styles
import './Create.css'

export default function Create() {
    const navigation = useNavigate()
    const ingredientInput = useRef(null);
    const [formdata, setFormdata] = useState({
        title: "",
        method: "",
        ingredient: "",
        ingredients: [],
        cookingtime: "",
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setFormdata(prevFormdata => ({
            ...prevFormdata,
            [name]: value
        }))
    }

    function handleAdd(event) {
        event.preventDefault();

        const ing = ingredientInput.current.value.trim()
        // if the input not null and the ingredients does not inclued
        if (ing && !formdata.ingredients.includes(ing)) {
            setFormdata(prevFormdata => ({
                ...prevFormdata,
                ingredient: "",
                ingredients: [...prevFormdata.ingredients, ing]
            }))
        }

        // focus
        ingredientInput.current.focus()
    }

    // submit data to database
    async function handleSubmit(event) {
        event.preventDefault()

        const { ingredient, ...createData } = formdata;
        createData.cookingtime += " minutes";
        console.log(createData);

        try {
            await addData("recipes", createData);
            navigation('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="create">
            <h2 className="page-title">Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe title:</span>
                    <input
                        type="text"
                        name="title"
                        value={formdata.title}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    <span>Recipe Ingredients:</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            name="ingredient"
                            value={formdata.ingredient}
                            onChange={handleChange}
                            ref={ingredientInput}
                        />
                        <button onClick={handleAdd} className="btn">add</button>
                    </div>
                </label>
                <p>
                    Current ingredients:
                    {formdata.ingredients.map(i => <em key={i}>{i}, </em>)}
                </p>
                <label>
                    <span>Recipe Method:</span>
                    <textarea
                        name="method"
                        value={formdata.method}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    <span>Cooking time (minutes):</span>
                    <input
                        type="number"
                        name="cookingtime"
                        value={formdata.cookingtime}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button className="btn">submit</button>
            </form>
        </div>
    )
}
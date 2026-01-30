import React, {useState} from "react";
import askChef from "../../utils/askChef";

function aiChef() {
    const [inputValue, setInputValue] = useState('');
    const [recipe, setRecipeValue] = useState('');
    const [loading, setLoading] = useState(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value);
        setInputValue(e.target.value);
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        //console.log(inputValue);
        const response = await askChef(inputValue);
        setRecipeValue(response);
        setLoading(false);
        console.log("Response from:", recipe);
    }
    return (
        <>
            <h1>Ask your recipes</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="e.g., How to make a chocolate cake?" className="default-input" onChange={handleInputChange} />
                </div>
                <div className="mt-4 p-4">
                    <button className="mt-2 bg-blue-500 text-white p-2 rounded" disabled={loading}>
                        {loading ? "Cooking..." : "Get Recipe"}
                    </button>
                </div>
                <div className=" recipe-output">
                    {recipe}
                </div>
            </form>

        </>
    )
}

export default aiChef
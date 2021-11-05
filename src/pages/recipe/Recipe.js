import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'

// styles
import './Recipe.css'

export default function Recipe() {
    const {id} = useParams()
    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    const { mode } = useTheme()

    useEffect(() => {
        setIsPending(true)

        const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
            if (doc.exists) {
                setRecipe(doc.data())
                setIsPending(false)
            } else {
                setError('Could not find that recipe!')
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })
        
        return () => unsub()

    }, [id])

    return (
        <div className={`recipe ${mode}`}>
            {isPending && <p className="loading">Loading...</p> }
            {error && <p className="error">{error}</p> }
            {recipe && (
                <>
                <h2 className={`page-title ${mode}`}>{recipe.title}</h2>
                <p>Takes {recipe.cookingTime} to cook.</p>
                <ul>
                    {recipe.ingredients.map(ing => <li key={ing}>{ing}</li> )}
                </ul>
                <p className="method">{recipe.method}</p>
                </>
            )}
        </div>
    )
}

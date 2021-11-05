import { useLocation } from 'react-router-dom'
import RecipeList from '../../components/RecipeList'
import { useFetch } from '../../hooks/useFetch'

// styles
import './Search.css'

export default function Search() {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)

    const search = queryParams.get('q')

    const { error, isPending, data } = useFetch(`http://localhost:3000/recipes?q=${search}`)

    return (
        <div>
            <h2 className="page-title">Recipes including "{search}"</h2>
            {error && <p className="error">{error}</p> }
            {isPending && <p className="loading">Loading...</p> }
            {data && <RecipeList recipes={data}/>}
        </div>
    )
}

import { useParams } from "react-router-dom"

const SearchPage = () => {
  const {city} = useParams()

  return (
    <span>User search form {city}</span>
  )
}

export default SearchPage
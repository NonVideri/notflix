import "./App.css"
import { useEffect, useState } from "react"
import Section from "./components/Section"
import HeroSection from "./components/HeroSection"
import NavBar from "./components/NavBar"

const App = () => {
  const genreIncrement = 4
  const [genres, setGenres] = useState(null)
  const [limit, setLimit] = useState(genreIncrement)

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getGenres", {
      method: "POST",
      body: limit,
    })
    const responseBody = await response.json()
    setGenres(responseBody.data.reference_list.values)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  const [movie, setMovie] = useState(null)
  const pageState = null

  const getRandomMovie = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: "Sci-Fi", pageState: pageState }),
    })
    const responseBody = await response.json()
    const movies = responseBody.data.movies_by_genre.values
    setMovie(movies[Math.floor(Math.random() * movies.length)])
  }

  useEffect(() => {
    getRandomMovie()
  }, [])

  const getMovie = async (genre, title) => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: genre, pageState: pageState }),
    })
    const responseBody = await response.json()
    const setFirst = (movies, title) => {
      for (let movie of movies) {
        if (movie.title === title) {
          setMovie(movie)
          return
        }
      }
    }
    setFirst(responseBody.data.movies_by_genre.values, title);
  }

  const handler = (e) => {
    const genre = e.target.dataset.genre;
    const title = e.target.dataset.title;
    getMovie(genre, title);
  }

  return (
    <>
      <NavBar />
      <HeroSection movie={movie} />
      {genres && (
        <div className="container">
          {Object.values(genres).map((genre) => (
            <Section key={genre.value} genre={genre.value} handler={handler}/>
          ))}
        </div>
      )}
      <div
        className="page-end"
        onMouseEnter={() => {
          setLimit(limit + genreIncrement)
        }}
      />
    </>
  )
}

export default App

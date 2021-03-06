import React, { useEffect, useState } from "react"
import Card from "./Card"

const Section = ({ genre, handler }) => {
  const [movies, setMovies] = useState(null)
  const [pageState, setPageState] = useState(null)

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: genre, pageState: pageState }),
    })
    const responseBody = await response.json()
    setMovies(responseBody.data.movies_by_genre.values)
    setPageState(responseBody.data.movies_by_genre.pageState)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h2 id={genre}>{genre}</h2>
      {movies && (
        <div className="movie-section">
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} genre={genre} handler={handler} />
          ))}
          <div
            className="more-button"
            onClick={() => {
              console.log(pageState)
              setPageState(pageState)
              fetchData()
            }}
          >
            <i className="fas fa-angle-right"></i>
          </div>
        </div>
      )}
    </>
  )
}

export default Section

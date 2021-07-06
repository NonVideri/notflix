const HeroSection = ({ movie }) => {

  return (
    <>
      {movie && (
        <div className="hero">
          <video className="hero-video" muted controls autoPlay={true} loop src={movie.thumbnail} type="video/mp4" >
          </video>

          <div className="info-section">
            <h3 className="hero-blurb">{movie.synopsis}</h3>
            <div className="button-section">
              <div className="button play">
                <span>
                  <i className="fas fa-play"></i>
                </span>
                Play
              </div>
              <div className="button more">
                <span>
                  <i className="fas fa-info-circle"></i>
                </span>
                More info
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HeroSection

import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import "../App.css";
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [mvList, setMvList] = useState(0);
  const [windows, setWindows] = useState(window.innerWidth);
  const [carouselWidth, setCarouselWidth] = useState(
    300 * Math.floor(windows / 300)
  );

  const getMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmQ5OTI1MTMyOGYyN2Y2NjY0ODlhMzM0MmNjNzQ3OCIsInN1YiI6IjY0YjY4MWViMGU0ZmM4NTE5ZGQyZDFiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zj61s84hElrX11kl1avdan0v6Mpf5kcvGJH2lPG3TWE",
      },
    };
    const json = await (
      await fetch("https://api.themoviedb.org/3/movie/now_playing", options)
    ).json();
    setMovies(json.results);
    setLoading(false);
  };
  const clickNext = () => {
    const transfer = 300;
    const maxWidth = movies.length * 300;
    if (maxWidth + mvList > windows) {
      setMvList(mvList - transfer);
    } else {
      setMvList(mvList);
    }
  };
  const clickPrev = () => {
    const transfer = 300;
    if (mvList + transfer > 0) {
      setMvList(0);
    } else {
      setMvList(mvList + transfer);
    }
  };
  const windowResize = () => {
    setWindows(window.innerWidth);
  };
  const carouselResize = () => {
    setCarouselWidth(300 * Math.floor(windows / 300));
  };
  useEffect(() => {
    getMovies();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      windowResize();
      carouselResize();
    });
    return () => {
      window.removeEventListener("resize", () => {
        windowResize();
        carouselResize();
      });
    };
  }, [windows]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <div
            className="carousel"
            style={{
              width: carouselWidth,
              position: "absolute",
              verticalAlign: "middle",
            }}
          >
            <div onClick={clickPrev} className="btn prevBtn">
              <span className="arrow-prev"></span>
            </div>
            <div onClick={clickNext} className="btn nextBtn">
              <span className="arrow-next"></span>
            </div>
            <div
              className="container"
              style={{
                marginLeft: mvList,
              }}
            >
              {movies.map((movie) => (
                <Movie
                  width={movies.length * 300}
                  marginLeft={mvList}
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;

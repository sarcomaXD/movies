import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [keywords, setkeywords] = useState([]);
  const { id } = useParams();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmQ5OTI1MTMyOGYyN2Y2NjY0ODlhMzM0MmNjNzQ3OCIsInN1YiI6IjY0YjY4MWViMGU0ZmM4NTE5ZGQyZDFiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zj61s84hElrX11kl1avdan0v6Mpf5kcvGJH2lPG3TWE",
    },
  };
  const getDetail = async () => {
    const json = await (
      await fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
    ).json();
    setMovie(json);
    getKeywords();
    setLoading(false);
  };
  const getKeywords = async () => {
    const json = await (
      await fetch(`https://api.themoviedb.org/3/movie/${id}/keywords`, options)
    ).json();
    setkeywords(json.keywords);
  };

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundImage: `url('https://www.themoviedb.org/t/p/original${movie.backdrop_path}')`,
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
              opacity: "0.5",
              position: "absolute",
            }}
          ></div>
          <h1>{movie.title}</h1>
          <div>
            {movie.adult ? <p>청소년관람불가</p> : null}
            <p>{movie.overview}</p>
            <ul>
              {movie.genres.map((g) => (
                <li key={g.id}>{g.name}</li>
              ))}
            </ul>
            <p>release_date : {movie.release_date}</p>
            <p>vote_average : {movie.vote_average}</p>
            <div>
              <h3>keywords</h3>
              <ul>
                {keywords.map((keyword) => (
                  <li key={keyword.id}>{keyword.name} </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;

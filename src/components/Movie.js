import { Link } from "react-router-dom";
function Movie({ id, title, poster_path }) {
  return (
    <div className="windows">
      <Link to={`/movie/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`}
          alt={title}
        ></img>
        <p className="title">{title}</p>
      </Link>
    </div>
  );
}
export default Movie;

import "./Posts.css";

// components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// redux
import { getPhotos, like } from "../../slices/photoSlice";

const Posts = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // busca
  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  // load all photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  // like a photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="posts">
      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {photos &&
        photos.map((photo) => (
          <div className="photo-container" key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <>
          <h2 className="no-photos">
            Ainda não temos fotos, a primeira postagem é sua, mãe{" "}
          </h2>
          <Link to={`/profile`}>Clique Aqui</Link>
        </>
      )}
    </div>
  );
};

export default Posts;

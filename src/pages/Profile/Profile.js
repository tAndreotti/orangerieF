import "./Profile.css";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencil, BsXLg} from "react-icons/bs";

// hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getUserDetails, resetMessage } from "../../slices/userSlice";
import { publishPhoto, getUserPhotos, deletePhoto, updatePhoto } from "../../slices/photoSlice";

const Profile = () => {
    const {id} = useParams();

    const dispatch = useDispatch();

    const {user, loading} = useSelector((state) => state.user);
    const {user: userAuth} = useSelector((state) => state.auth);
    const {photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector((state) => state.photo);

    // states
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const [editId, setEditId] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editTitle, setEditTitle] = useState("");

    // new form and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    // load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

    const handleFile = (e) => {
        // image preview
        const image = e.target.files[0];

        setImage(image);
    };

    // function reset messages
    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 4000);
    }

    const submitHandle = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image
        }

        // build form data
        const formData = new FormData();

        const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));

        formData.append("photo", photoFormData);

        dispatch(publishPhoto(formData));

        setTitle("");

        resetComponentMessage();
    }

    // delete a photo
    const handleDelete = (id) => {
        dispatch(deletePhoto(id));

        resetComponentMessage();
    }

    // show or hide forms
    const hideOrShowForms = () => {
        newPhotoForm.current.classList.toggle("hide")
        editPhotoForm.current.classList.toggle("hide")
    }

    // update a photo
    const handleUpdate = (e) => {
        e.preventDefault();

        const photoData = {
            title: editTitle,
            id: editId
        };

        dispatch(updatePhoto(photoData));

        resetComponentMessage();
    }

    // open edit form
    const handleEdit = (photo) => {
        if(editPhotoForm.current.classList.contains("hide")) {
            hideOrShowForms();
        }

        setEditId(photo._id);
        setEditTitle(photo.title);
        setEditImage(photo.image);
    }

    // calcel edit
    const handleCancelEdit = (e) => {
        hideOrShowForms();
    }

    if (loading) {
        return <p>Carregando...</p>
    };

    return (
        <div id="profile">
            <div className="profile-header">
                {user.profileImage && (
                    <img className="profile-image" src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
                <hr className="line" />
            </div>
            {id === userAuth._id && (
                <>
                    <div className="new-photo" ref={newPhotoForm}>
                        <h3>Compartilhe seu novo cantinho</h3>
                        <form onSubmit={submitHandle}>
                            <label>
                                <span>Título:</span>
                                <input type="text" placeholder="Insira um título" onChange={(e) => setTitle(e.target.value)} value={title || ""} />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile} />
                            </label>
                            {!loadingPhoto && <input type="submit" value="POSTAR" />}
                            {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
                            {errorPhoto && <Message msg={errorPhoto} type="error" />}
                            {messagePhoto && <Message msg={messagePhoto} type="success" />}
                        </form>
                    </div>
                    <div className="edit-photo hide" ref={editPhotoForm}>
                        <span>Insira um novo título</span>
                        {editImage && (
                            <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                        )}
                        <form onSubmit={handleUpdate}>
                            <input type="text" placeholder="Insira um título" onChange={(e) => setEditTitle(e.target.value)} value={editTitle || ""} />
                            <input type="submit" value="ATUALIZAR" />
                            <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar Edição</button>
                            {messagePhoto && <Message msg={messagePhoto} type="success" />}
                        </form>
                    </div>
                </>
            )}
            <div className="user-photos">
                <h2>Fotos Publicadas</h2>
                <div className="photos-container">
                    {Array.isArray(photos) && 
                    photos.map((photo) => (
                        <div className="photo" key={photo._id}>
                            {photo.image && (
                                <img 
                                    src={`${uploads}/photos/${photo.image}`} 
                                    alt={photo.title} 
                                />)}
                                {id === userAuth._id ? (
                                    <div className="actions">
                                    <Link to={`/photos/${photo._id}`}>
                                        <BsFillEyeFill />
                                    </Link>
                                    <BsPencil onClick={() => handleEdit(photo)} />
                                    <BsXLg onClick={() => handleDelete(photo._id)} />
                                    </div>
                                ) : (
                                    <Link className="actions" to={`/photos/${photo._id}`}>
                                        <BsFillEyeFill />
                                    </Link>
                                )}
                        </div>
                    ))}
                    {photos.length === 0 && <p>Ainda não possui compartilhamentos</p>}
                </div>
            </div>
        </div>
    )
}

export default Profile;
import { useEffect, useState } from "react";
import PageMenu from "../../components/pageMenu/Pagemenu";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card";
import { getUser, updatePhoto, updateUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { shortenText } from "../../utils";

const cloud_name = "dcvw7stam";
const upload_preset = "cktmyaco";
const url = "https://api.cloudinary.com/v1_1/dcvw7stam/image/upload";

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: {
      address: user?.address?.address || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo || "",
        address: {
          address: user?.address?.address || "",
          state: user?.address?.state || "",
          country: user?.address?.country || "",
        },
      });
    }
  }, [dispatch, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  };

  const saveProfile = async (e) => {
    e.preventDefault()
    
    const userData = {
      name: profile.name,
      phone: profile.phone,
      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,

      }
    }
    await dispatch(updateUser(userData));
  };

  const savePhoto = async (e) => {
    e.preventDefault()
    let imageURL;

    try{
      if(
        profileImage !== null && (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.type === "image/png" )
      ){
        const image = new FormData()
        image.append("file", profileImage)
        image.append("cloud_name", cloud_name)
        image.append("upload_preset", upload_preset)

        //guardar imagen cloudinary
        const response = await fetch(url, {method: "post", body: image})
        const imgData = await response.json()
        // console.log(imgData)
        imageURL = imgData.url.toString()
      }

      // guardar imagen en mongodb
      const userData = {
        photo: profileImage ? imageURL : profile.photo
      }
      await dispatch(updatePhoto(userData));
      setImagePreview(null)
    }catch(error){
      toast.error(error.message)
    } 
  };

  return (
    <>
      <section>
        {isLoading && <Loader/>}
        <div className="container">
          <PageMenu />
          <h2>Perfil</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {!isLoading && (
                <>
                  <div className="profile-photo">
                    <div>
                      <img src={imagePreview === null ? user?.photo : imagePreview} alt="" />
                      <h3>Rol: {profile.role}</h3>
                      {imagePreview !== null && (
                        <div className="--center-all">
                        <button className="--btn --btn-secondary" onClick={savePhoto}>
                          <AiOutlineCloudUpload size={18} /> Cargar foto
                        </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <form onSubmit={saveProfile}>
                    <p>
                      <label>Cambiar foto:</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        
                      />
                    </p>
                    <p>
                      <label>Nombre:</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.name}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>Correo:</label>
                      <input
                        type="email"
                        name="email"
                        value={profile?.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </p>
                    <p>
                      <label>Telefono:</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>Direccion:</label>
                      <input
                        type="text"
                        name="address"
                        value={profile?.address?.address}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>Provincia:</label>
                      <input
                        type="text"
                        name="state"
                        value={profile?.address?.state}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>Departamento:</label>
                      <input
                        type="text"
                        name="country"
                        value={profile?.address?.country}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                      Actualizar perfil
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export const UserName = () => {
  const { user } = useSelector((state) => state.auth);
  const username = user?.name || "..."
  return(
    <span style={{color: "#ff7722"}}>
      Hola, { shortenText(username, 9) } |
    </span>
  )
};

export default Profile;

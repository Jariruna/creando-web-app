import styled from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux"
import { RESET_AUTH, register } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState ={
    name: "",
    email: "",
    password: "",
    cPassword: "",
};

const Register = () => {
    const [formData, setFormData] = useState(initialState)
    const { name, email, password, cPassword } = formData;
    const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value} = e.target
        setFormData({ ...formData, [name]: value })
    };

    const registerUser = async (e) => {
      e.preventDefault();
      if(!email || !password){
        return toast.error("todos los campos son requeridos")
      }
      if(password.length > 6){
        return toast.error("La contraseña debe tener mas de 6 caracteres")
      }
      if(!validateEmail(email)){
        return toast.error("Por favor ingrese un correo valido")
      }
      if(password !== cPassword){
        return toast.error("Las contraseñas no son iguales")
      }
      const userData = {
        name,
        email,
        password
      }

      await dispatch(register(userData))
    };

    useEffect(() => {
      if(isSuccess && isLoggedIn){
        navigate("/");
      }

      dispatch(RESET_AUTH())
    }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <>
    {isLoading && <Loader />}
    <section className={`container ${styled.auth}`}>
      <Card>
        <div className={styled.form}>
          <h2>Registrarse</h2>
          <form onSubmit={registerUser}>
          <input
              type="text"
              placeholder="nombre"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="correo"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="contraseña"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="confirme contraseña"
              required
              name="cPassword"
              value={cPassword}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary ..btn-block">
              registrarse
            </button>
          </form>
          <span className={styled.register}>
            <p>¿Si Tiene una cuenta?</p>
            <Link to="/login">Inicie sesion</Link>
          </span>
        </div>
      </Card>
      <div className={styled.img}>
        <img src={registerImg} alt="login" width="400" />
      </div>
      
    </section>
    </>
  );
};

export default Register;


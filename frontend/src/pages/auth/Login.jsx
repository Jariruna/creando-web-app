import styled from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, login } from "../../redux/features/auth/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const loginUser = async  (e) => {
      e.preventDefault();
      if(!email || !password){
        return toast.error("todos los campos son requeridos")
      }
      if(!validateEmail(email)){
        return toast.error("Por favor ingrese un correo valido")
      }
     
      const userData = {
        
        email,
        password
      };
      
      await dispatch(login(userData));
    };

    useEffect(() => {
      if(isSuccess && isLoggedIn){
        navigate("/")
      }

      dispatch(RESET_AUTH())
    }, [isSuccess, isLoggedIn, dispatch, navigate])

  return (
    <>
    {isLoading && <Loader />}
    <section className={`container ${styled.auth}`}>
      <div className={styled.img}>
        <img src={loginImg} alt="login" width="400" />
      </div>
      <Card>
        <div className={styled.form}>
          <h2>Inicie Sesion</h2>
          <form onSubmit={loginUser}>
            <input
              type="text"
              placeholder="correo"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary ..btn-block">
              Inicie Sesion
            </button>
          </form>
          <span className={styled.register}>
            <p>¿Tiene una cuenta?</p>
            <Link to="/register">Registrarse</Link>
          </span>
        </div>
      </Card>
    </section>
    </>
  );
};

export default Login;

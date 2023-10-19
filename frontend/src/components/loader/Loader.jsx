import styled from "./Loader.module.scss";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/loader.gif"

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styled.wrapper} >
        <div className={styled.loader} >
            <img src={loaderImg} alt="cargando" />
        </div>
    </div>,

    document.getElementById("loader")
  );
};

export const Spinner = () => {
    return (
        <div className="--center-all">
            <img src={loaderImg} alt="cargando" width={40}/>
        </div>

    )
}

export default Loader;

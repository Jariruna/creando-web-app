/* eslint-disable react/prop-types */
import styled from "./Card.module.scss"

const Card = ({children, cardClass}) => {
  return <div className={`${styled.card} ${cardClass}`}>
      {children}
    </div>;
  
};

export default Card;

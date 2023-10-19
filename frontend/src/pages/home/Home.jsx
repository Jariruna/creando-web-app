/* eslint-disable react/prop-types */
import Slider from "../../components/slider/Slider"
import './Home.scss'
import HomeInfoBox from "./HomeInfoBox"
import { productData } from "../../components/corousel/data"
import CorouselItem from "../../components/corousel/CorouselItem"
import ProductCorousel from "../../components/corousel/Corousel"
import ProductCategory from "./ProductCategory"
import FooterLinks from "../../components/footer/FooterLinks"

const PageHeading = ({heading, btnText}) => {
  return(
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">
          {btnText}
        </button>
      </div>
      <div className="--hr"></div>
    </>
  )
};

const Home = () => {
const productss = productData.map((item) => (
  <div key={item.id}>
    <CorouselItem 
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}  
    />
  </div>
))

  return (
    <>
    <Slider/>
    <section>
      <div className="container">
        <HomeInfoBox />
        <PageHeading heading={"Ultimos Productos"} btnText={"Comprar Ahora>>>"} />
        <ProductCorousel products={productss} />
      </div>
    </section>
    <section className="--bg-grey">
      <div className="container">
        <h3>Categorias</h3>
        <ProductCategory />
      </div>
    </section>
    <section>
      <div className="container">
        
        <PageHeading heading={"Toyota"} btnText={"Comprar Ahora>>>"} />
        <ProductCorousel products={productss} />
      </div>
    </section>
    <FooterLinks />
    </>
  )
}

export default Home

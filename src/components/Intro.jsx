import { useDispatch, useSelector } from "react-redux";
import FrontCard from "./FrontCard";
import { useEffect } from "react";
import { fetchProductsData } from "../store/productList";
import Hero from "./Hero";

const Intro = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productList = useSelector((store) => store.productList.list);

  return (
    <div className="w-full">
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 place-items-center">
          {productList?.length ==0 && 'PRODUCT IS LOADING...'}
          {productList?.map((item) => (
            <FrontCard
              key={item.id}
              id={item.id}
              title={item.title}
              rating_rate={item.rating_rate}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Intro;

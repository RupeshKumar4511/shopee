import { useOutletContext } from 'react-router-dom';
import Card from './Card';
import { useSelector } from 'react-redux';

const CardContainer = () => {
  const loading = useSelector((store) => store.productList.loading);
  const error = useSelector((store) => store.productList.error);
  const { filteredData } = useOutletContext();

  if (loading) {
    return (
      <div className="min-h-64 flex items-center justify-center px-4">
        <h1 className="text-xl sm:text-2xl font-medium text-gray-700 text-center">
          Loading...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-64 flex items-center justify-center px-4">
        <h1 className="text-lg sm:text-2xl font-medium text-red-600 text-center">
          {error}
        </h1>
      </div>
    );
  }

  if (filteredData?.length === 0) {
    return (
      <div className="min-h-80 flex items-center justify-center px-4">
        <h2 className="text-lg sm:text-xl text-gray-600 text-center">
          No products found matching your search.
        </h2>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 place-items-center">
        {filteredData.map((item) => (
          <Card
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
  );
};

export default CardContainer;

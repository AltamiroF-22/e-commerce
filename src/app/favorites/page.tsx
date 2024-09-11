import Container from "../components/Container";
import ProductCard from "../components/product/Product";
import { ProductsProps } from "../page";
import { SafeUser } from "../types";

const Favorite = ({
  favoritesProducts,
  currentUser,
}: {
  favoritesProducts: ProductsProps[];
  currentUser: SafeUser;
}) => {
  if (!favoritesProducts.length) {
    return (
      <div
        style={{ minHeight: "calc(75dvh - 5em)" }}
        className="flex items-center justify-center"
      >
        <p className="text-center text-zinc-600">
          You don't have any favorite products yet.
        </p>
      </div>
    );
  }

  return (
    <Container>
      <h1 className="text-xl text-zinc-800 font-thin mb-10">{"Favorites"}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-40">
        {favoritesProducts.map((product) => (
          <ProductCard
            key={product.id}
            productName={product.title}
            imageSrc={product.mainImage}
            gender={product.gender}
            imageAlt={product.description}
            price={product.price.toFixed(2).toString()}
            id={product.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Favorite;

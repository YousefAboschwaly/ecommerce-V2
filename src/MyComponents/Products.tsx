import useProducts from "@/hooks/useProducts";
import LoadingScreen from "./LoadingScreen";
import ProductCard from "@/components/ui/ProductCard";
import { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/ui/Search";

export default function Products() {
  const { data, isLoading, isError, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredProducts(data);
    }
  }, [data]);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredProducts(data);
      return;
    }

    const filtered = data.filter((product: IProduct) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    console.log(error);
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="py-6">
        <SearchBar onSearch={handleSearch} totalResults={filteredProducts.length} />
      </div>
      <ProductCard products={filteredProducts} />
    </>
  );
}


import LoadingScreen from "./LoadingScreen"
import ProductCard from "@/components/ui/ProductCard"
import CategorySlider from "./category-slider"
import MainSlider from "./MainSlider"
import useProducts from "@/hooks/useProducts"






export default function ProductGrid() {
  // This would normally come from an API
  // const [products, setProducts] = useState<IProduct[]>([])




const {data,isLoading,isError,error}= useProducts()
if(isError){
  console.log(error)
}

if(isLoading){
  return <LoadingScreen/>
}

  return (
   <>
   <MainSlider/>

    <CategorySlider/>

   <ProductCard products={data} />
   </>
  )
}


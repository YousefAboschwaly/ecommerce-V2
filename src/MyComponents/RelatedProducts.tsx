import ProductCard from "@/components/ui/ProductCard"
import { IProduct } from "@/interfaces"
import axios from "axios"
import { useEffect, useState } from "react"

interface IProps{
 category:string
}
export default function RelatedProducts({category}:IProps) {
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([])
  
  console.log(relatedProducts)
  useEffect(()=>{
  const controller = new AbortController()
  const signal = controller.signal
async function getAllProducts(){
  try{
  const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
    signal: signal
  })
  setRelatedProducts(data.data.filter((product:IProduct)=>product.category.name===category))

  }
  catch(err){
    console.log(err)
  }

}
 
  getAllProducts()

  return ()=>{
    controller.abort()
  }
},[category])
  return (
    <>

    <ProductCard products={relatedProducts} />

    </>
  )
}
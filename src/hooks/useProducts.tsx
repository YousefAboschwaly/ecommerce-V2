import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useProducts() {

function getAllProducts(){
 return axios.get("https://ecommerce.routemisr.com/api/v1/products")
}
const query  = useQuery({
  queryKey:['allProducts'],
  queryFn:getAllProducts,
  select:(data)=>data.data.data
  
})

  return (query  )
}

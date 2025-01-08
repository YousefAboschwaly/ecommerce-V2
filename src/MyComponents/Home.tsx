"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import LoadingScreen from "./LoadingScreen"
import { Link } from "react-router-dom"





interface Product {
  id: string
  title: string
  category: {name:string}
  price: number
  ratingsAverage: number
  imageCover: string
  
}
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function ProductGrid() {
  // This would normally come from an API
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)



function getAllProducts(){
  setIsLoading(true)
  axios.get("https://ecommerce.routemisr.com/api/v1/products").then(({data})=>{
    setProducts(data.data)
    setIsLoading(false)
  }).catch((err)=>console.log(err))
}
useEffect(()=>{
  getAllProducts()
},[])

if(isLoading){
  return <LoadingScreen/>
}

  // const toggleFavorite = (productId: string) => {
  //   setProducts(products.map(product => 
  //     product.id === productId 
  //       ? { ...product, isFavorited: !product.isFavorited }
  //       : product
  //   ))
  // }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <Link to={`/productdetails/${product.id}`}>
          <Card className="overflow-hidden group product">
            <CardContent className="p-0">
              <div className="relative">
                <motion.img
                  src={product.imageCover }
                  alt={product.title}
                  className="w-full h-auto aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.button
                  className={`absolute top-4 right-4 p-2 rounded-full bg-white`}
                  // onClick={() => toggleFavorite(product.id)}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Heart 
                    className={`w-6 h-6 ${
                      'text-gray-600'
                    }`} 
                  />
                </motion.button>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-sm text-green-600">{product.category.name}</p>
                <h3 className="font-semibold">{product.title.split(' ').splice(0,2).join(' ')}</h3>
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {product.price} EGP
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm">{product.ratingsAverage}</span>
                  </div>
                </div>
                <Button className="add-btn w-full bg-green-600 hover:bg-green-700 translate-y-[150%] opacity-0 transition-all duration-700 ">
                  Add +
                </Button>
              </div>
            </CardContent>
          </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}


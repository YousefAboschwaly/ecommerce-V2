"use client"

/* eslint-disable react-refresh/only-export-components */
import type { ICart } from "@/interfaces"
import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import axios from "axios"
import { createContext, type ReactNode, useState } from "react"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
interface CartContextType {
  query: UseQueryResult<ICart, unknown>
  addToCart: (productId: string) => Promise<void>
  isLoading: boolean

}

export const CartContext = createContext<CartContextType | null>(null)

export default function CartContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const getCart = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    })
  }
  const query = useQuery({
    queryKey: ["cart"] as const,
    queryFn: getCart,
    select: (data) => data.data,
  })
  

  if(query.data){
    if(query.data.data.cartOwner){

      localStorage.setItem("cartOwnerId", query.data.data.cartOwner)
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const addToCart = async (productId: string) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post<ICart>(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: productId },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        },
      )

      if (data.status === "success") {
        toast.success("Product added to cart", {
          position: "top-center",
        })
        query.refetch()
      }
    } catch (error) {
      toast.error("Failed to add product to cart", { position: "top-center" })
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CartContext.Provider value={{ query, addToCart, isLoading}}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            minWidth: "300px",
            padding: "15px ",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          },

          error: {
            style: {
              background: "#dc2626",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#dc2626",
            },
          },
        }}
      />
    </CartContext.Provider>
  )
}


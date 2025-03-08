/* eslint-disable react-refresh/only-export-components */
import {  IWishList } from "@/interfaces";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
interface WishlistContextType {
  query: UseQueryResult<IWishList, unknown>;
  addToWishlist: (productId: string) => Promise<void>;
  isLoading: boolean;
  removeFromWishlist: (productId: string) => Promise<void>;
}

export const WishlistContext = createContext<WishlistContextType | null>(null);

export default function WishlistContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getWishlist = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  };

  const query = useQuery({
    queryKey: ["wishlist"] as const,
    queryFn: getWishlist,
    select: (data) => data.data,
  });

  const [isLoading, setIsLoading] = useState(false);

  const addToWishlist = async (productId: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post<IWishList>(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      if (data.status === "success") {
        toast.success("Product added to wishlist", {
          position: "top-center",
        });
        query.refetch();
      }
    } catch (error) {
      toast.error("Failed to add product to wishlist", {position: "top-center"});
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      if (data.status === "success") {
        toast.success("Product removed from wishlist", {
          position: "top-center",
        });
        query.refetch();
      }
    } catch (error) {
      toast.error("Failed to remove product from wishlist", {position: "top-center"});
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WishlistContext.Provider value={{ query, addToWishlist, removeFromWishlist, isLoading }}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            minWidth: "300px",
            padding: "15px",
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
    </WishlistContext.Provider>
  );
}
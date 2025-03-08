"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Calendar,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import axios from "axios"
import type { IOrder } from "@/interfaces"
import { useQuery } from "@tanstack/react-query"

export const Orders: React.FC = () => {


  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  function getAllOrders() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem('cartOwnerId')}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    })
  }
  const { data, isLoading } = useQuery({
    queryKey: ["orders", localStorage.getItem("cartOwnerId")] as const,
    queryFn: getAllOrders,
    select: (data) => data.data,
  })

  const orders = data as IOrder[]
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-teal-100 to-violet-100 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-teal-100 to-violet-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <motion.div
            className="w-20 h-20 bg-white rounded-2xl shadow-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-600"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <Package className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 inline-block text-transparent bg-clip-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Orders
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Track and manage your purchase history
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          <AnimatePresence>
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-violet-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                        <Package className="w-6 h-6 text-violet-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Order {index + 1}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          order.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.isPaid ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Paid
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <XCircle className="w-4 h-4" />
                            Pending
                          </div>
                        )}
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          order.isDelivered ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.isDelivered ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Delivered
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Truck className="w-4 h-4" />
                            In Transit
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Shipping Address</h4>
                        <p className="text-sm text-gray-600">{order.shippingAddress.details}</p>
                        <p className="text-sm text-gray-600">{order.shippingAddress.city}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Contact</h4>
                        <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>
                        <p className="text-sm text-gray-600">{order.user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                        <CreditCard className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Payment</h4>
                        <p className="text-sm text-gray-600 capitalize">{order.paymentMethodType}</p>
                        <p className="text-sm font-medium text-violet-600">${order.totalOrderPrice}</p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                    className="w-full flex items-center justify-between text-violet-600 hover:text-violet-700 transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {expandedOrder === order._id ? "Hide" : "Show"} Order Items ({order.cartItems.length})
                    </span>
                    {expandedOrder === order._id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {expandedOrder === order._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 space-y-4">
                          {order.cartItems.map((item) => (
                            <motion.div
                              key={item._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50"
                            >
                              <img
                                src={item.product.imageCover || "/placeholder.svg"}
                                alt={item.product.title}
                                className="w-20 h-20 rounded-xl object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{item.product.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < Math.floor(item.product.ratingsAverage)
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">({item.product.ratingsAverage})</span>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-sm text-gray-500">Quantity: {item.count}</span>
                                  <span className="text-sm font-medium text-violet-600">${item.price} each</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-violet-600">${item.price * item.count}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}


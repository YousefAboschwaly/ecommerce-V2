"use client";

import { useContext, useState } from "react";
import {
  ShoppingCart,
  Heart,
  Menu,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "@/Context/UserContext";
import logo from "../assets/freshcart-logo.svg";
import user from "../assets/user.webp";
import { CartContext } from "@/Context/CartContext";
import { WishlistContext } from "@/Context/WishlistContext";
const AnimatedLink = motion.create(Link);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userContext = useContext(UserContext);
  if (!userContext) {
    
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const { userToken, setUserToken } = userContext;

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const { query } = cartContext;
  const { data, isLoading } = query;

  const wishlistContext = useContext(WishlistContext);
  if (!wishlistContext) {
    throw new Error("WishlistContext must be used within a WishlistContextProvider");
  }
  const { query: wishlistQuery } = wishlistContext;
  const { data: wishlistData, isLoading: wishlistLoading } = wishlistQuery;

  function logout() {
    localStorage.removeItem("userToken");
    setUserToken("");
  }
  // const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Cart", href: "/cart" },
    { title: "Orders", href: "/allorders" },
    { title: "Wishlist", href: "/wishlist" },
    { title: "Categories", href: "/categories" },
    { title: "Brands", href: "/brands" },
  ];

  const socialIcons = [
    { Icon: Instagram, href: "https://instagram.com" },
    { Icon: Facebook, href: "https://facebook.com" },
    { Icon: Twitter, href: "https://twitter.com" },
    { Icon: Linkedin, href: "https://linkedin.com" },
    { Icon: Youtube, href: "https://youtube.com" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center ">
        <div className="flex items-center justify-between gap-2 mr-4 md:mr-0 ">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-green-600 md:text-2xl"
          >
            <img alt="Logo" src={logo} className=" w-[7.5rem]  md:w-[8.8rem]" />
          </Link>
        </div>

        {userToken && (
          <nav className="hidden md:flex items-center space-x-6 mx-auto">
            {menuItems.map((item) => (
              <AnimatedLink
                key={item.title}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.title}
              </AnimatedLink>
            ))}
          </nav>
        )}

        <div
          className={`flex items-center ml-auto  ${
            userToken && " md:ml-0"
          }  gap-4 `}
        >
          <div className="hidden md:flex items-center gap-4">
            {socialIcons.map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                className="text-muted-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {userToken && (
            <div className="hidden md:flex items-center gap-4">

              <Link to="/wishlist" className="relative">
                <Heart className="h-6 w-6" />
                {!wishlistLoading && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-600 text-[10px] font-bold text-white flex items-center justify-center">
                    {wishlistData?.count}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {!isLoading && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-600 text-[10px] font-bold text-white flex items-center justify-center">
                    {data?.numOfCartItems}
                  </span>
                )}
              </Link>
            </div>
          )}

          {!userToken && (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/signup" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Signup
                </Link>
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2 md:hidden ">
            {!userToken && (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/signup">Signup</Link>
                </Button>
              </>
            )}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col  h-full">
                  <AnimatePresence>
                    {isOpen && (
                      <>
                        {userToken &&
                          menuItems.map((item, index) => (
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0, y: 50 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 50 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <AnimatedLink
                                to={item.href}
                                className="text-lg font-semibold block py-2"
                                whileHover={{ scale: 1.05, x: 20 }}
                                whileTap={{ scale: 0.95, x: 0 }}
                                onClick={() => setIsOpen(false)}
                              >
                                {item.title}
                              </AnimatedLink>
                            </motion.div>
                          ))}
                        {userToken && (
                          <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{
                              duration: 0.3,
                              delay: menuItems.length * 0.1,
                            }}
                            className="flex items-center  gap-4 mt-4"
                          >

                            <Link
                              to="/wishlist"
                              className="relative"
                              onClick={() => setIsOpen(false)}
                            >
                              <ShoppingCart className="h-5 w-5" />
                              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-green-600 text-[10px] font-bold text-white flex items-center justify-center">
                                {wishlistData?.count}
                              </span>
                            </Link>
                            <Link
                              to="/cart"
                              className="relative"
                              onClick={() => setIsOpen(false)}
                            >
                              <ShoppingCart className="h-5 w-5" />
                              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-green-600 text-[10px] font-bold text-white flex items-center justify-center">
                                {data?.numOfCartItems}
                              </span>
                            </Link>
                          </motion.div>
                        )}

                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 50 }}
                          transition={{
                            duration: 0.3,
                            delay: (menuItems.length + 1) * 0.1,
                          }}
                          className="flex gap-4 mt-6"
                        >
                          {socialIcons.map(({ Icon, href }) => (
                            <a
                              key={href}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                            >
                              <Icon className="h-5 w-5" />
                            </a>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {userToken && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <img
                    alt="Avatar"
                    className="rounded-full w-8 h-8"
                    height="32"
                    src={user}
                    style={{
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className=" p-0">
                  <Link
                    to="/login"
                    className="flex w-full p-1"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

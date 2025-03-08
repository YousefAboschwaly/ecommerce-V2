"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Loader2 } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
  totalResults: number
}

export function SearchBar({ onSearch, totalResults }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setIsSearching(true)
    onSearch(query)
    // Simulate search delay for better UX
    setTimeout(() => setIsSearching(false), 300)
  }

  const clearSearch = () => {
    setSearchQuery("")
    onSearch("")
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4">
      <motion.div
        className="relative flex items-center"
        initial={false}
        animate={{
          width: isExpanded ? "100%" : "48px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className={`relative flex items-center w-full overflow-hidden rounded-lg ${
            isExpanded ? "shadow-lg ring-1 ring-black/5 rounded-[9999px]" : ""
          }`}
          style={{
            backgroundColor: isExpanded ? "white" : "rgb(243, 244, 246)",
          }}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-14 h-14 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.input
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                type="text"
                placeholder="Search anything..."
                className="w-full h-14 pl-2 pr-14 text-gray-700 bg-transparent outline-none text-lg"
                value={searchQuery}
                onChange={handleSearch}
                autoFocus
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isExpanded && searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-4 p-2 text-gray-400 hover:text-gray-600"
                onClick={clearSearch}
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <X className="w-5 h-5" />
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-white rounded-2xl shadow-xl overflow-hidden z-50 backdrop-blur-sm bg-white/80 ring-1 ring-black/5"
          >
            <div className="p-6">
              {searchQuery ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Found <span className="font-semibold text-gray-900">{totalResults}</span>{" "}
                      {totalResults === 1 ? "result" : "results"} for "
                      <span className="text-indigo-600">{searchQuery}</span>"
                    </p>
                    {isSearching && (
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    )}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Start typing to search through{" "}
                    <span className="font-medium text-gray-900">{totalResults}</span> items
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      Press Enter to search
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      ESC to close
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
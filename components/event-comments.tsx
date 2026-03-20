"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send } from "lucide-react"

interface Comment {
  id: number
  username: string
  avatar: string
  text: string
  timeAgo: string
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    username: "Aman K.",
    avatar: "A",
    text: "Looks insane 🔥🔥",
    timeAgo: "2h ago",
  },
  {
    id: 2,
    username: "Priya S.",
    avatar: "P",
    text: "Who's coming? DM me!",
    timeAgo: "4h ago",
  },
  {
    id: 3,
    username: "Rohan M.",
    avatar: "R",
    text: "Booked already! Can't wait 🎉",
    timeAgo: "6h ago",
  },
  {
    id: 4,
    username: "Sara L.",
    avatar: "S",
    text: "The lineup is stacked omg",
    timeAgo: "8h ago",
  },
]

const AVATAR_GRADIENTS = [
  "from-[var(--hive-orange)] to-amber-600",
  "from-violet-500 to-purple-700",
  "from-emerald-400 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-sky-400 to-blue-600",
  "from-fuchsia-500 to-pink-600",
]

function getGradient(index: number) {
  return AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]
}

export function EventComments() {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS)
  const [inputValue, setInputValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = inputValue.trim()
    if (!text) return

    const newComment: Comment = {
      id: Date.now(),
      username: "You",
      avatar: "Y",
      text,
      timeAgo: "Just now",
    }

    setComments((prev) => [newComment, ...prev])
    setInputValue("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
    >
      {/* Section Header */}
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white/90">
        <MessageCircle className="w-6 h-6 mr-3 text-[var(--hive-orange)]" />
        Community Buzz
      </h2>

      <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden backdrop-blur-sm">
        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="p-4 border-b border-white/[0.06]">
          <div
            className={`flex items-center gap-3 rounded-xl bg-white/[0.04] border px-4 py-3 transition-all duration-300 ${
              isFocused
                ? "border-[var(--hive-orange)]/40 shadow-[0_0_16px_rgba(255,106,0,0.08)]"
                : "border-white/[0.08] hover:border-white/15"
            }`}
          >
            {/* User avatar for input */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white/60">U</span>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Add a comment…"
              className="flex-1 bg-transparent text-sm text-white/90 placeholder-white/30 outline-none caret-[var(--hive-orange)]"
              maxLength={150}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                inputValue.trim()
                  ? "bg-[var(--hive-orange)] text-white shadow-[0_0_12px_rgba(255,106,0,0.4)] hover:scale-110 active:scale-95"
                  : "bg-white/[0.06] text-white/20 cursor-not-allowed"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="divide-y divide-white/[0.04]">
          <AnimatePresence initial={false}>
            {comments.slice(0, 5).map((comment, idx) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="flex items-start gap-3 p-4 group hover:bg-white/[0.02] transition-colors duration-300">
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${getGradient(
                      comment.username === "You" ? 99 : idx
                    )} flex items-center justify-center shrink-0 shadow-md`}
                  >
                    <span className="text-[11px] font-bold text-white leading-none">
                      {comment.avatar}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-white/80 truncate">
                        {comment.username}
                      </span>
                      <span className="text-[10px] text-white/25 font-medium shrink-0">
                        {comment.timeAgo}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed break-words">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

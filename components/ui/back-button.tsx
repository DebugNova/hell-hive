"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function BackButton({ label = "Go Back" }: { label?: string }) {
  const router = useRouter()

  return (
    <button 
      onClick={() => router.back()}
      className="inline-flex items-center text-white/50 hover:text-[var(--hive-orange)] transition-colors mb-6 group text-sm font-medium focus:outline-none"
    >
      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
      {label}
    </button>
  )
}

'use client'
import { useSession, signIn, signOut } from "next-auth/react"

const LoginBtn = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex flex-col items-center p-6 bg-[#FFF7F7] rounded-lg shadow-lg">
        <p className="mb-2 text-lg font-semibold text-[#1230AE]">
          מחובר לחשבון של <span className="text-[#6C48C5]">{session.user.name || session.user.email}</span>
        </p>
        <button
          className="px-6 py-2 bg-[#1230AE] text-white rounded-lg hover:bg-[#6C48C5] transition-all duration-200"
          onClick={() => signOut()}
        >
          יציאה
        </button>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center p-6 bg-[#FFF7F7] rounded-lg shadow-lg">
      <p className="mb-2 text-lg font-semibold text-[#1230AE]">
        אינך מחובר לחשבון משתמש
      </p>
      <button
        className="px-6 py-2 bg-[#6C48C5] text-white rounded-lg hover:bg-[#1230AE] transition-all duration-200"
        onClick={() => signIn()}
      >
        התחברות לחשבון שלך
      </button>
    </div>
  )
}

export default LoginBtn

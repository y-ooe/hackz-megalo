import { useState } from 'react'
import { LoaderCircle, LockKeyhole } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

function Step3Amazon({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAuth = () => {
    setIsLoading(true)
    setError('')

    // OAuth遷移後に戻ってきたことを判定するための一時フラグ
    sessionStorage.setItem('oauth_pending_step', 'amazon')
    window.location.href = `${API_BASE_URL}/auth/amazon/login`
  }

  return (
    <div className="space-y-6 rounded-2xl border border-amber-400/30 bg-slate-950/65 p-6 shadow-[0_0_32px_rgba(251,191,36,0.18)] backdrop-blur">
      <div className="flex items-center gap-3 text-amber-300">
        <LockKeyhole className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Step 3: Amazon Cognito Auth</h2>
      </div>

      <p className="text-sm text-slate-300">バックエンドの /auth/amazon/login 経由でCognito認証画面に遷移します。</p>

      <button
        type="button"
        onClick={handleAuth}
        disabled={isLoading}
        className="w-full rounded-lg border border-amber-400/60 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-4 py-3 font-semibold text-amber-100 transition hover:from-amber-500/30 hover:to-yellow-500/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="inline-flex items-center gap-2">
          {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <span className="text-base">🛒</span>}
          {isLoading ? 'Amazon認証中...' : 'Login with Amazon'}
        </span>
      </button>

      {error && <p className="text-sm text-rose-400">{error}</p>}
    </div>
  )
}

export default Step3Amazon

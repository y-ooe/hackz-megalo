import { useState } from 'react'
import { Github, LoaderCircle, ShieldCheck } from 'lucide-react'
import { startGitHubAuth } from '../api'

function Step2GitHub({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAuth = async () => {
    setIsLoading(true)
    setError('')

    try {
      await startGitHubAuth()
      onSuccess()
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'GitHub認証に失敗しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border border-emerald-400/30 bg-slate-950/65 p-6 shadow-[0_0_32px_rgba(16,185,129,0.18)] backdrop-blur">
      <div className="flex items-center gap-3 text-emerald-300">
        <ShieldCheck className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Step 2: GitHub Auth</h2>
      </div>

      <p className="text-sm text-slate-300">バックエンドのGitHub OAuthゲートへ接続し、トークン認証を完了させます。</p>

      <button
        type="button"
        onClick={handleAuth}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-400/50 bg-black/40 px-4 py-3 font-semibold text-emerald-200 transition hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Github className="h-4 w-4" />}
        {isLoading ? 'GitHubに接続中...' : 'GitHubで認証'}
      </button>

      {error && <p className="text-sm text-rose-400">{error}</p>}
      <p className="text-xs text-slate-400">認証先: /auth/github</p>
    </div>
  )
}

export default Step2GitHub

import { useState, useRef } from 'react'
import Webcam from 'react-webcam'
import { motion } from 'framer-motion'
import { LoaderCircle, Radar } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const webcamConstraints = {
  facingMode: 'user',
}

function Step5FaceID({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const webcamRef = useRef(null)

  const handleScan = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Webカメラからスクリーンショットを取得（base64）
      const imageSrc = webcamRef.current.getScreenshot()
      if (!imageSrc) {
        throw new Error('カメラの映像をキャプチャできませんでした。')
      }

      // バックエンドにPOST送信
      const response = await fetch(`${API_BASE_URL}/auth/face/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          imageData: imageSrc,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Face ID認証に失敗しました。')
      }

      const data = await response.json()
      if (data.status === 'success') {
        onSuccess()
      } else {
        throw new Error(data.message || 'Face ID認証に失敗しました。')
      }
    } catch (scanError) {
      setError(scanError instanceof Error ? scanError.message : 'Face ID認証に失敗しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border border-cyan-400/35 bg-slate-950/65 p-6 shadow-[0_0_40px_rgba(6,182,212,0.22)] backdrop-blur">
      <div className="flex items-center gap-3 text-cyan-200">
        <Radar className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Step 5: Face ID Final Stage</h2>
      </div>

      <p className="text-sm text-slate-300">カメラ映像からバイオメトリクスをスキャンし、最終防壁を突破してください。</p>

      <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl border border-cyan-400/40 bg-black">
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored
          screenshotFormat="image/jpeg"
          videoConstraints={webcamConstraints}
          className="h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="scan-line absolute left-0 h-[2px] w-full"
            animate={{ top: ['8%', '88%', '8%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
          />

          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/70" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/25" />

          <div className="absolute left-6 top-6 h-8 w-8 border-l-2 border-t-2 border-cyan-300" />
          <div className="absolute right-6 top-6 h-8 w-8 border-r-2 border-t-2 border-cyan-300" />
          <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-cyan-300" />
          <div className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-cyan-300" />
        </div>
      </div>

      <button
        type="button"
        onClick={handleScan}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-400/50 bg-cyan-500/10 px-4 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        {isLoading ? '顔情報をスキャン中...' : 'Face IDをスキャンして完了'}
      </button>

      {error && <p className="text-sm text-rose-400">{error}</p>}
    </div>
  )
}

export default Step5FaceID

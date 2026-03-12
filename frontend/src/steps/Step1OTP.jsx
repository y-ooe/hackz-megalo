import { useMemo, useRef, useState } from 'react'
import { KeyRound, LoaderCircle } from 'lucide-react'
import { verifyOtp } from '../api'

const OTP_LENGTH = 6

function Step1OTP({ onSuccess }) {
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef([])

  const otpCode = useMemo(() => otpDigits.join(''), [otpDigits])
  const canSubmit = otpCode.length === OTP_LENGTH && !otpDigits.includes('') && !isLoading

  const updateDigit = (index, value) => {
    const normalized = value.replace(/\D/g, '').slice(-1)
    const nextDigits = [...otpDigits]
    nextDigits[index] = normalized
    setOtpDigits(nextDigits)

    if (normalized && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && otpDigits[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) {
      return
    }

    const merged = Array(OTP_LENGTH)
      .fill('')
      .map((_, index) => pasted[index] ?? otpDigits[index])

    setOtpDigits(merged)
    const nextFocusIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    inputRefs.current[nextFocusIndex]?.focus()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!canSubmit) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await verifyOtp(otpCode)
      onSuccess()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'OTP認証に失敗しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border border-cyan-400/30 bg-slate-950/65 p-6 shadow-[0_0_32px_rgba(34,211,238,0.15)] backdrop-blur">
      <div className="flex items-center gap-3 text-cyan-300">
        <KeyRound className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Step 1: OTP Verification</h2>
      </div>

      <p className="text-sm text-slate-300">6桁のワンタイムパスワードを入力し、認証シールドを解除してください。</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 gap-2 sm:gap-3" onPaste={handlePaste}>
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(event) => updateDigit(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className="h-12 w-full rounded-lg border border-cyan-500/40 bg-black/50 text-center text-xl font-semibold text-cyan-200 outline-none transition focus:border-cyan-300 focus:shadow-[0_0_20px_rgba(45,212,191,0.45)]"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-400/50 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          {isLoading ? '検証中...' : 'OTPを検証して次へ'}
        </button>
      </form>
    </div>
  )
}

export default Step1OTP

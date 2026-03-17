import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Shield, TerminalSquare } from 'lucide-react'
import Step1OTP from './steps/Step1OTP'
import Step2GitHub from './steps/Step2GitHub'
import Step3Amazon from './steps/Step3Amazon'
import Step4Google from './steps/Step4Google'
import Step5FaceID from './steps/Step5FaceID'

const TOTAL_STAGES = 5

const stageMeta = [
  { title: 'OTP', subtitle: 'One-Time Password Verification' },
  { title: 'GitHub Auth', subtitle: 'OAuth Security Link' },
  { title: 'Amazon Auth', subtitle: 'Cognito Federation Layer' },
  { title: 'Google Auth', subtitle: 'Identity Bridge Access' },
  { title: 'Face ID', subtitle: 'Biometric Final Gate' },
]

const stepComponents = [Step1OTP, Step2GitHub, Step3Amazon, Step4Google, Step5FaceID]

function App() {
  const [stage, setStage] = useState(1)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const githubAuth = params.get('githubAuth')
    const amazonAuth = params.get('amazonAuth')
    const pendingStep = sessionStorage.getItem('oauth_pending_step')

    if (githubAuth === 'success' && pendingStep === 'github') {
      sessionStorage.removeItem('oauth_pending_step')
      setStage((prev) => (prev < 3 ? 3 : prev))
    }

    if (githubAuth === 'failed' && pendingStep === 'github') {
      sessionStorage.removeItem('oauth_pending_step')
      setStage((prev) => (prev < 2 ? 2 : prev))
    }

    if (amazonAuth === 'success' && pendingStep === 'amazon') {
      sessionStorage.removeItem('oauth_pending_step')
      setStage((prev) => (prev < 4 ? 4 : prev))
    }

    if (amazonAuth === 'failed' && pendingStep === 'amazon') {
      sessionStorage.removeItem('oauth_pending_step')
      setStage((prev) => (prev < 3 ? 3 : prev))
    }

    if (githubAuth || amazonAuth) {
      params.delete('githubAuth')
      params.delete('amazonAuth')
      const nextQuery = params.toString()
      const cleanUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}`
      window.history.replaceState({}, '', cleanUrl)
    }
  }, [])

  const completedCount = isComplete ? TOTAL_STAGES : stage - 1
  const progressPercent = (completedCount / TOTAL_STAGES) * 100

  const handleStepSuccess = () => {
    if (stage >= TOTAL_STAGES) {
      setIsComplete(true)
      return
    }
    setStage((prev) => prev + 1)
  }

  const resetChallenge = () => {
    setStage(1)
    setIsComplete(false)
  }

  const ActiveStepComponent = stepComponents[Math.min(stage - 1, TOTAL_STAGES - 1)]

  return (
    <main className="min-h-screen bg-transparent px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="rounded-2xl border border-emerald-400/30 bg-slate-950/70 p-6 shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-emerald-300">
                <TerminalSquare className="h-4 w-4" />
                The Ultimate Auth Challenge
              </p>
              <h1 className="text-2xl font-bold text-cyan-100 sm:text-3xl">Security Breach Simulation Console</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
              <Shield className="h-4 w-4" />
              Stage {Math.min(stage, TOTAL_STAGES)} / {TOTAL_STAGES}
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Authentication Progress</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-5">
            {stageMeta.map((item, index) => {
              const stepNumber = index + 1
              const isUnlocked = isComplete || stepNumber <= stage
              const isDone = isComplete || stepNumber < stage
              return (
                <li
                  key={item.title}
                  className={`rounded-lg border px-2 py-2 transition ${
                    isUnlocked
                      ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-100'
                      : 'border-slate-700 bg-slate-900/50 text-slate-500'
                  }`}
                >
                  <p className="flex items-center gap-1 font-semibold">
                    {isDone ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> : null}
                    {stepNumber}. {item.title}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-300/80">{item.subtitle}</p>
                </li>
              )
            })}
          </ul>
        </header>

        {isComplete ? (
          <section className="rounded-2xl border border-emerald-400/30 bg-slate-950/70 p-8 text-center shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <p className="text-4xl">✅</p>
            <h2 className="mt-3 text-2xl font-bold text-emerald-300">All Authentication Layers Bypassed</h2>
            <p className="mt-2 text-sm text-slate-300">Final clearance granted. You have completed The Ultimate Auth Challenge.</p>
            <button
              type="button"
              onClick={resetChallenge}
              className="mt-6 rounded-lg border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
            >
              チャレンジをリスタート
            </button>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.section
              key={stage}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ActiveStepComponent onSuccess={handleStepSuccess} />
            </motion.section>
          </AnimatePresence>
        )}
      </div>
    </main>
  )
}

export default App

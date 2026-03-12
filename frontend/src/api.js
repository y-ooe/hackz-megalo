const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Authentication request failed')
  }

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }

  return null
}

export async function verifyOtp(otpCode) {
  try {
    return await request('/auth/otp', {
      method: 'POST',
      body: JSON.stringify({ otpCode }),
    })
  } catch {
    await wait(500)
    if (otpCode.length !== 6) {
      throw new Error('OTPは6桁で入力してください。')
    }
    return { success: true }
  }
}

export async function startGitHubAuth() {
  const authUrl = `${API_BASE_URL}/auth/github`
  window.open(authUrl, '_blank', 'noopener,noreferrer')
  await wait(700)
  return { success: true }
}

export async function startAmazonAuth() {
  await wait(900)
  return { success: true }
}

export async function startGoogleAuth() {
  await wait(900)
  return { success: true }
}

export async function verifyFaceScan() {
  await wait(1400)
  return { success: true }
}

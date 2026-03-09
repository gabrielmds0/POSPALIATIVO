const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id']
const CLICK_ID_KEYS = ['fbclid', 'gclid', 'wbraid', 'gbraid', 'ttclid', 'msclkid']
const TRACKING_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS]
const FIRST_TOUCH_STORAGE_KEY = 'lm-pospaliativo-first-touch'
const SESSION_ID_STORAGE_KEY = 'lm-pospaliativo-session-id'

function isBrowser() {
  return typeof window !== 'undefined'
}

function readUrlParams() {
  if (!isBrowser()) return {}

  const params = new URLSearchParams(window.location.search)
  const values = {}
  params.forEach((value, key) => {
    values[key] = value
  })
  return values
}

function getFirstTouch() {
  if (!isBrowser()) return null

  try {
    const stored = window.localStorage.getItem(FIRST_TOUCH_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function persistFirstTouchFromUrl() {
  if (!isBrowser()) return null

  const params = readUrlParams()
  const attribution = {}
  TRACKING_KEYS.forEach((key) => {
    if (params[key]) attribution[key] = params[key]
  })

  if (Object.keys(attribution).length === 0) return getFirstTouch()

  const nowIso = new Date().toISOString()
  const payload = { capturedAt: nowIso, ...attribution }

  try {
    if (!window.localStorage.getItem(FIRST_TOUCH_STORAGE_KEY)) {
      window.localStorage.setItem(FIRST_TOUCH_STORAGE_KEY, JSON.stringify(payload))
      return payload
    }
    return getFirstTouch()
  } catch {
    return null
  }
}

export function getSessionId() {
  if (!isBrowser()) return null

  let sessionId = window.sessionStorage.getItem(SESSION_ID_STORAGE_KEY)
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    window.sessionStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId)
  }

  return sessionId
}

export function initializeTrackingSession() {
  if (!isBrowser()) return

  getSessionId()
  persistFirstTouchFromUrl()
}

export function getCaptureData() {
  if (!isBrowser()) return {}

  const params = readUrlParams()
  const firstTouch = getFirstTouch() || persistFirstTouchFromUrl() || {}
  const utm = {}
  const clickIds = {}

  UTM_KEYS.forEach((key) => {
    utm[key] = params[key] || firstTouch[key] || null
  })

  CLICK_ID_KEYS.forEach((key) => {
    clickIds[key] = params[key] || firstTouch[key] || null
  })

  return {
    capturedAt: new Date().toISOString(),
    url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer || null,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    userAgent: navigator.userAgent,
    session_id: getSessionId(),
    utm,
    clickIds,
    firstTouch: Object.keys(firstTouch).length ? firstTouch : null,
  }
}

export function buildTrackedUrl(baseUrl) {
  if (!isBrowser() || !baseUrl) return baseUrl || null

  try {
    const url = new URL(baseUrl, window.location.origin)
    const capture = getCaptureData()
    const trackingParams = {
      ...capture.utm,
      ...capture.clickIds,
      session_id: capture.session_id,
    }

    Object.entries(trackingParams).forEach(([key, value]) => {
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value)
      }
    })

    return url.toString()
  } catch {
    return baseUrl
  }
}

export function trackEvent(eventName, additionalData = {}) {
  if (!isBrowser()) return

  const capture = getCaptureData()
  const payload = {
    ...additionalData,
    ...capture.utm,
    ...capture.clickIds,
    session_id: capture.session_id,
    page_path: capture.path,
    page_url: capture.url,
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload)
  }

  if (
    typeof window.fbq === 'function' &&
    ['cta_click', 'lead_form_submit', 'generate_lead'].includes(eventName)
  ) {
    window.fbq('track', 'Lead', {
      content_name: additionalData.section || additionalData.source || 'unknown',
      session_id: capture.session_id,
    })
  }
}


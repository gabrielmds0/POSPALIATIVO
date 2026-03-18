import { useEffect, useMemo, useRef, useState } from 'react'
import { content } from '../../content/contentLoader'
import { Button } from './Button'
import { getCaptureData, trackEvent } from '../../lib/tracking'

const WEBHOOK_URL =
  'https://projetolm-n8n.8x0hqh.easypanel.host/webhook/0f4aff4b-4ef7-4c17-a9d1-735f2edfae2a'

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
]

const CLICK_ID_KEYS = [
  'fbclid',
  'gclid',
  'wbraid',
  'gbraid',
  'ttclid',
  'msclkid',
]

const TRACKING_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS]

const FIRST_TOUCH_STORAGE_KEY = 'lm-pospaliativo-first-touch'
const HARD_CODED_PHONE_COUNTRY_CODE = '+55'
const HARD_CODED_PHONE_COUNTRY_LABEL = 'Brasil'

function getUrlParams() {
  const params = new URLSearchParams(window.location.search)
  const values = {}
  params.forEach((value, key) => {
    values[key] = value
  })
  return values
}

function getTrackingPayload() {
  const params = getUrlParams()
  const attribution = {}

  TRACKING_KEYS.forEach((key) => {
    if (params[key]) attribution[key] = params[key]
  })

  const nowIso = new Date().toISOString()
  let firstTouch = null

  try {
    const storedFirstTouch = window.localStorage.getItem(FIRST_TOUCH_STORAGE_KEY)
    if (storedFirstTouch) {
      firstTouch = JSON.parse(storedFirstTouch)
    } else if (Object.keys(attribution).length > 0) {
      firstTouch = { capturedAt: nowIso, ...attribution }
      window.localStorage.setItem(FIRST_TOUCH_STORAGE_KEY, JSON.stringify(firstTouch))
    }
  } catch {
    firstTouch = null
  }

  const utm = {}
  UTM_KEYS.forEach((key) => {
    utm[key] = params[key] || firstTouch?.[key] || null
  })

  const clickIds = {}
  CLICK_ID_KEYS.forEach((key) => {
    clickIds[key] = params[key] || firstTouch?.[key] || null
  })

  return {
    capturedAt: nowIso,
    url: window.location.href,
    path: window.location.pathname,
    queryParams: params,
    attribution,
    utm,
    clickIds,
    firstTouch,
    referrer: document.referrer || null,
    userAgent: navigator.userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

function getThankYouUrl() {
  const search = window.location.search || ''
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const basePath = normalizedPath.endsWith('/obrigado')
    ? normalizedPath.slice(0, -'/obrigado'.length) || '/'
    : normalizedPath
  const prefix = basePath === '/' ? '' : basePath
  return `${prefix}/obrigado${search}`
}

function getPhoneDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

function normalizeBrazilPhoneDigits(raw, maxDigits = 11) {
  const allDigits = getPhoneDigits(raw)
  const digits = allDigits.length > maxDigits && allDigits.startsWith('55') ? allDigits.slice(2) : allDigits
  return digits.slice(0, maxDigits)
}

function formatPhone(raw, maxDigits = 11) {
  const digits = normalizeBrazilPhoneDigits(raw, maxDigits)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

/**
 * RegisterModal â€” modal de inscriÃ§Ã£o na live.
 * - Focus trap real para acessibilidade (WCAG 2.1 critÃ©rio 2.1.2)
 * - role="dialog" + aria-modal no card visÃ­vel (nÃ£o no backdrop)
 * - Fecha com Escape e clique fora
 * - Envia para o webhook e redireciona para a pagina de obrigado no sucesso
 */
export function RegisterModal({ onClose }) {
  const { form } = content
  const phoneField = form.fields.find((field) => field.name === 'telefone')
  const [values, setValues] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const modalRef = useRef(null)
  const closeRef = useRef(null)
  const phoneMaxDigits = phoneField?.localDigits || 11
  const phoneMaxLength = phoneField?.maxLength || 15

  // Foca no botÃ£o de fechar ao abrir o modal
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  // Fecha com Escape + Focus trap real
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll(
          'a, button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Bloqueia scroll do body enquanto modal estÃ¡ aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  function hasValue(value) {
    if (typeof value === 'string') return value.trim().length > 0
    return Boolean(value)
  }

  function validate(currentValues = values) {
    const newErrors = {}

    form.fields.forEach((field) => {
      const currentValue = currentValues[field.name]
      if (field.required && !hasValue(currentValue)) {
        newErrors[field.name] = `${field.label} é obrigatório.`
      }
      if (field.type === 'email' && currentValue) {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValue)
        if (!emailOk) newErrors[field.name] = 'Informe um e-mail válido.'
      }
      if (field.type === 'tel' && currentValue) {
        const digits = normalizeBrazilPhoneDigits(currentValue, phoneMaxDigits)
        if (digits.length !== phoneMaxDigits) {
          newErrors[field.name] = field.helperText || 'Informe um telefone celular válido.'
        }
      }
    })
    return newErrors
  }

  const formErrors = useMemo(() => validate(values), [values])
  const isFormValid = Object.keys(formErrors).length === 0
  const canSubmit = isFormValid && !isSubmitting

  function handleChange(e) {
    const { name, value } = e.target
    const newValue = name === 'telefone' ? formatPhone(value, phoneMaxDigits) : value
    setValues((prev) => ({ ...prev, [name]: newValue }))
    setTouchedFields((prev) => ({ ...prev, [name]: true }))
    if (submitError) setSubmitError('')
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouchedFields((prev) => ({ ...prev, [name]: true }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setHasAttemptedSubmit(true)
    if (!isFormValid) {
      trackEvent('form_validation_error', {
        event_category: 'form',
        form_name: 'register_modal',
        error_fields: Object.keys(formErrors).join(','),
      })
      return
    }

    const crmField = form.fields.find((field) => field.name === 'crm')
    const crmLabel =
      crmField?.options?.find((option) => option.value === values.crm)?.label || values.crm || ''

    const fieldValues = {}
    form.fields.forEach((field) => {
      const fieldValue = values[field.name]
      fieldValues[field.name] = typeof fieldValue === 'string' ? fieldValue.trim() : fieldValue
    })

    const phoneDigits = normalizeBrazilPhoneDigits(fieldValues.telefone, phoneMaxDigits)
    const internationalPhone = phoneDigits ? `${HARD_CODED_PHONE_COUNTRY_CODE}${phoneDigits}` : null

    const tracking = getTrackingPayload()
    const captureData = getCaptureData()

    const payload = {
      event: 'lead_form_submit',
      source: 'pospaliativo-landing',
      sentAt: new Date().toISOString(),
      formData: {
        ...fieldValues,
        crmLabel,
        telefone_pais: HARD_CODED_PHONE_COUNTRY_LABEL,
        telefone_codigo_pais: HARD_CODED_PHONE_COUNTRY_CODE,
        telefone_somente_digitos: phoneDigits || null,
        telefone_internacional: internationalPhone,
      },
      utm: tracking.utm,
      clickIds: tracking.clickIds,
      ...tracking.utm,
      ...tracking.clickIds,
      session_id: captureData.session_id || null,
      tracking: {
        ...tracking,
        session_id: captureData.session_id || null,
        page_title: document.title,
      },
    }

    try {
      setIsSubmitting(true)
      setSubmitError('')
      trackEvent('lead_form_submit', {
        event_category: 'form',
        form_name: 'register_modal',
        source: 'pospaliativo-landing',
      })

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: payload }),
      })

      if (!response.ok) {
        throw new Error(`Falha no webhook: ${response.status}`)
      }

      setSubmitted(true)
      trackEvent('form_success', {
        event_category: 'form',
        form_name: 'register_modal',
      })
      window.location.assign(getThankYouUrl())
    } catch (error) {
      setSubmitError('NÃ£o foi possÃ­vel enviar sua inscriÃ§Ã£o agora. Tente novamente em instantes.')
      console.error('Erro ao enviar inscriÃ§Ã£o para webhook:', error)
      trackEvent('form_error', {
        event_category: 'form',
        form_name: 'register_modal',
        error_message: error?.message || 'unknown_error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fecha ao clicar no backdrop (fora do card)
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    // Backdrop â€” captura clique fora; nÃ£o carrega role dialog
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdropClick}
    >
      {/* Card do modal â€” role, aria-modal e aria-labelledby ficam aqui */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-md rounded-card border border-white/10 bg-surface-1 p-8 shadow-2xl"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* BotÃ£o fechar */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Fechar formulÃ¡rio de inscriÃ§Ã£o"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {submitted ? (
          /* Estado de sucesso â€” id="modal-title" mantido para aria-labelledby */
          <div className="text-center py-4">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2e52eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 id="modal-title" className="text-xl font-bold text-white mb-2">
              {form.successTitle}
            </h2>
            <p className="text-gray-300 text-sm">{form.successMessage}</p>
            <button
              onClick={onClose}
              className="mt-6 text-sm text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Fechar
            </button>
          </div>
        ) : (
          /* FormulÃ¡rio */
          <>
            <h2 id="modal-title" className="text-xl font-bold text-white mb-1">
              {form.title}
            </h2>
            <p className="text-gray-400 text-sm mb-6">{form.subtitle}</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                {form.fields.map((field) => {
                  const fieldId = `field-${field.name}`
                  const shouldShowError = hasAttemptedSubmit || touchedFields[field.name]
                  const fieldError = shouldShowError ? formErrors[field.name] : undefined

                  if (field.type === 'radio' && Array.isArray(field.options)) {
                    return (
                      <div key={field.name}>
                        <fieldset
                          className="space-y-3"
                          aria-invalid={!!fieldError}
                          aria-describedby={fieldError ? `err-${field.name}` : undefined}
                        >
                          <legend className="block text-sm font-medium text-gray-300 mb-1">
                            {field.label}
                            {field.required && (
                              <span className="text-accent ml-1" aria-hidden="true">
                                *
                              </span>
                            )}
                          </legend>

                          {field.options.map((option) => {
                            const optionId = `${fieldId}-${option.value}`
                            const checked = values[field.name] === option.value

                            return (
                              <label
                                key={option.value}
                                htmlFor={optionId}
                                className={[
                                  'flex cursor-pointer items-center gap-3 rounded-[14px] border px-4 py-4',
                                  'focus-within:outline-none focus-within:ring-2 focus-within:ring-accent/70',
                                  'transition-colors duration-200',
                                  checked
                                    ? 'border-accent/70 bg-accent/10 text-white'
                                    : 'border-white/10 bg-white/[0.02] text-white hover:border-white/25',
                                ].join(' ')}
                              >
                                <input
                                  id={optionId}
                                  name={field.name}
                                  type="radio"
                                  value={option.value}
                                  required={field.required}
                                  checked={checked}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="sr-only"
                                />
                                <span
                                  aria-hidden="true"
                                  className={[
                                    'flex h-5 w-5 flex-none items-center justify-center rounded-full border',
                                    'transition-colors duration-200',
                                    checked ? 'border-accent bg-accent/20' : 'border-white/30',
                                  ].join(' ')}
                                >
                                  <span
                                    className={[
                                      'h-2.5 w-2.5 rounded-full bg-accent transition-opacity duration-200',
                                      checked ? 'opacity-100' : 'opacity-0',
                                    ].join(' ')}
                                  />
                                </span>
                                <span className="text-[1.03rem] leading-snug">{option.label}</span>
                              </label>
                            )
                          })}
                        </fieldset>

                        {fieldError && (
                          <p id={`err-${field.name}`} role="alert" className="mt-1 text-xs text-red-400">
                            {fieldError}
                          </p>
                        )}
                      </div>
                    )
                  }

                  if (field.type === 'tel') {
                    const helperText = field.helperText
                    const describedBy = [
                      helperText ? `hint-${field.name}` : null,
                      fieldError ? `err-${field.name}` : null,
                    ]
                      .filter(Boolean)
                      .join(' ') || undefined

                    return (
                      <div key={field.name}>
                        <label htmlFor={fieldId} className="block text-sm font-medium text-gray-300 mb-1">
                          {field.label}
                          {field.required && (
                            <span className="text-accent ml-1" aria-hidden="true">
                              *
                            </span>
                          )}
                        </label>

                        <input
                          id={fieldId}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          autoComplete={field.autocomplete}
                          inputMode="numeric"
                          maxLength={phoneMaxLength}
                          value={values[field.name] || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={!!fieldError}
                          aria-describedby={describedBy}
                          className={[
                            'w-full rounded-btn px-4 py-3 text-sm',
                            'bg-white/5 border text-white placeholder-gray-500',
                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                            'transition-colors duration-200',
                            fieldError ? 'border-red-500/60' : 'border-white/10 hover:border-white/20',
                          ].join(' ')}
                        />

                        {helperText && (
                          <p id={`hint-${field.name}`} className="mt-1 text-xs text-gray-400">
                            {helperText}
                          </p>
                        )}

                        {fieldError && (
                          <p id={`err-${field.name}`} role="alert" className="mt-1 text-xs text-red-400">
                            {fieldError}
                          </p>
                        )}
                      </div>
                    )
                  }

                  return (
                    <div key={field.name}>
                      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-300 mb-1">
                        {field.label}
                        {field.required && (
                          <span className="text-accent ml-1" aria-hidden="true">
                            *
                          </span>
                        )}
                      </label>
                      <input
                        id={fieldId}
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                        autoComplete={field.autocomplete}
                        inputMode={field.type === 'tel' ? 'numeric' : undefined}
                        maxLength={field.type === 'tel' ? 13 : undefined}
                        value={values[field.name] || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!fieldError}
                        aria-describedby={fieldError ? `err-${field.name}` : undefined}
                        className={[
                          'w-full rounded-btn px-4 py-3 text-sm',
                          'bg-white/5 border text-white placeholder-gray-600',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                          'transition-colors duration-200',
                          fieldError ? 'border-red-500/60' : 'border-white/10 hover:border-white/20',
                        ].join(' ')}
                      />
                      {fieldError && (
                        <p id={`err-${field.name}`} role="alert" className="mt-1 text-xs text-red-400">
                          {fieldError}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>

              {submitError && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                  {submitError}
                </p>
              )}

              {!canSubmit && !isSubmitting && (
                <p className="mt-3 text-xs text-gray-400">
                  Preencha corretamente todos os campos obrigatorios para liberar o envio.
                </p>
              )}

              <Button
                type="submit"
                variant="solid"
                size="lg"
                className="w-full mt-6 disabled:bg-accent-dark/50 disabled:text-white/70 disabled:shadow-none"
                disabled={!canSubmit}
              >
                {isSubmitting ? 'Enviando...' : form.submit}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const OFFENCE_TYPES = [
  'Speeding',
  'Stunt Driving / Racing',
  'Careless Driving',
  'Distracted Driving',
  'Failure to Stop',
  'Driving Under Suspension',
  'Licence / Registration Issue',
  'RIDE / Sobriety Check',
  'Seatbelt Violation',
  'Other HTA Offence',
]

export default function SubmitTicketPage() {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [offenceType, setOffenceType] = useState('')
  const [courtDate, setCourtDate] = useState('')
  const [notes, setNotes] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [ticketNumber, setTicketNumber] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUserId(user.id)
    }
    check()
  }, [router])

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!offenceType) { setError('Please select an offence type.'); return }
    if (!photo && !ticketNumber.trim()) { setError('Please upload a photo of your ticket or enter the ticket number.'); return }
    setSubmitting(true)
    setError('')

    const formData = new FormData()
    formData.append('driverId', userId)
    formData.append('offenceType', offenceType)
    formData.append('courtDate', courtDate)
    formData.append('notes', notes)
    formData.append('ticketNumber', ticketNumber)
    if (photo) formData.append('photo', photo)

    const res = await fetch('/api/submit-ticket', { method: 'POST', body: formData })
    const data = await res.json()

    if (!res.ok || !data.success) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
      return
    }

    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="app-shell" style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 24px' }}>✅</div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Ticket submitted</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: '1.7', marginBottom: '32px' }}>
            We've received your ticket and will review it shortly. A paralegal will be assigned and we'll be in touch with next steps.
          </p>
          <Link href="/driver" style={{ textDecoration: 'none' }}>
            <button className="btn-primary">Back to Home</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell" style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ padding: '20px 24px 16px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid var(--border)', background: 'rgba(12,15,22,0.9)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/driver" style={{ color: 'var(--text-muted)', display: 'flex' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </Link>
        <div>
          <p className="label" style={{ marginBottom: '1px' }}>RoadRight</p>
          <p style={{ fontSize: '16px', fontWeight: '600' }}>Fight a Ticket</p>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Intro */}
        <div style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '14px', padding: '16px 18px' }}>
          <p style={{ fontSize: '13px', color: 'rgba(232,235,240,0.65)', lineHeight: '1.6' }}>
            Submit your ticket and we'll assign a licensed paralegal to review it. We'll send you their quote — no obligation.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Offence type */}
          <div>
            <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Offence Type *</label>
            <select
              value={offenceType}
              onChange={e => setOffenceType(e.target.value)}
              className="input"
              style={{ cursor: 'pointer', color: '#E8EBF0' }}
              required
            >
              <option value="" style={{ background: '#0C0F16', color: '#E8EBF0' }}>Select offence type...</option>
              {OFFENCE_TYPES.map(o => <option key={o} value={o} style={{ background: '#0C0F16', color: '#E8EBF0' }}>{o}</option>)}
            </select>
          </div>

          {/* Court date */}
          <div>
            <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Court Date <span style={{ color: 'var(--text-muted)' }}>(if shown on ticket)</span></label>
            <input
              type="date"
              value={courtDate}
              onChange={e => {
                const val = e.target.value
                const year = val.split('-')[0]
                if (!year || year.length <= 4) setCourtDate(val)
              }}
              max="9999-12-31"
              className="input"
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className="label" style={{ display: 'block', marginBottom: '8px' }}>
              Photo of Ticket *
              <span style={{ color: 'var(--text-muted)', fontWeight: '400', textTransform: 'none', letterSpacing: 0, fontSize: '12px' }}> — or enter ticket number below</span>
            </label>
            {photoPreview ? (
              <div style={{ position: 'relative' }}>
                <img src={photoPreview} alt="Ticket" style={{ width: '100%', borderRadius: '12px', maxHeight: '200px', objectFit: 'cover' }} />
                <button
                  type="button"
                  onClick={() => { setPhoto(null); setPhotoPreview(null) }}
                  style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: 'white', cursor: 'pointer', fontSize: '14px' }}
                >✕</button>
              </div>
            ) : (
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: `1px dashed ${photo ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.15)'}`, borderRadius: '12px', padding: '28px', cursor: 'pointer' }}>
                <span style={{ fontSize: '28px' }}>📷</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Tap to upload ticket photo</span>
                <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} style={{ display: 'none' }} />
              </label>
            )}
          </div>

          {/* Ticket number (alternative) */}
          {!photo && (
            <div>
              <label className="label" style={{ display: 'block', marginBottom: '8px' }}>
                Ticket Number *
                <span style={{ color: 'var(--text-muted)', fontWeight: '400', textTransform: 'none', letterSpacing: 0, fontSize: '12px' }}> — printed on your ticket</span>
              </label>
              <input
                type="text"
                value={ticketNumber}
                onChange={e => setTicketNumber(e.target.value)}
                className="input"
                placeholder="e.g. A12345678 (letter + 8 digits)"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="label" style={{ display: 'block', marginBottom: '8px' }}>Additional Notes <span style={{ color: 'var(--text-muted)' }}>(optional)</span></label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="input"
              placeholder="Anything else we should know about the stop..."
              rows={3}
              style={{ resize: 'none' }}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '12px 14px', fontSize: '13px', color: '#FCA5A5' }}>
              {error}
            </div>
          )}

          <button className="btn-primary" type="submit" disabled={submitting} style={{ marginTop: '8px' }}>
            {submitting ? <span className="spinner" /> : 'Submit Ticket'}
          </button>

        </form>

        <div className="safe-bottom" style={{ paddingBottom: '16px' }} />
      </div>
    </div>
  )
}

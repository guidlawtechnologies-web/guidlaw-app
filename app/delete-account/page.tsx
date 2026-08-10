export default function DeleteAccountPage() {
  return (
    <main style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '60px 24px 80px',
      color: '#e2e8f0',
      fontFamily: "'Outfit', sans-serif",
      lineHeight: '1.75',
    }}>
      <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
        Request Account Deletion
      </h1>
      <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '14px' }}>
        Roadright Technologies Ltd. · roadright.ca
      </p>

      <p>
        You may request the deletion of your RoadRight account and associated personal data at any time.
        To submit a deletion request, send an email to{' '}
        <a href="mailto:info@roadright.ca" style={{ color: '#3b82f6' }}>info@roadright.ca</a>{' '}
        with the subject line <strong style={{ color: '#ffffff' }}>Account Deletion Request</strong> and
        include the email address associated with your account.
      </p>

      <p style={{ marginTop: '16px' }}>
        We will process your request and confirm deletion within <strong style={{ color: '#ffffff' }}>30 days</strong>.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginTop: '48px', marginBottom: '12px' }}>
        What gets deleted
      </h2>
      <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
        <li>Your account credentials (email address, password, and name)</li>
        <li>Your profile and account settings</li>
        <li>Video and audio recordings of consultations (if still within the 90-day retention window)</li>
        <li>Push notification tokens and device identifiers</li>
        <li>Usage and session data associated with your account</li>
      </ul>

      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginTop: '48px', marginBottom: '12px' }}>
        What is retained after deletion
      </h2>
      <p>Certain data must be retained after your account is deleted to comply with Canadian law:</p>
      <ul style={{ paddingLeft: '24px', marginTop: '12px', marginBottom: '12px' }}>
        <li>
          <strong style={{ color: '#ffffff' }}>Ticket and case files</strong> — retained for a minimum of
          7 years from the date the matter closed, as required by the Law Society of Ontario's By-Laws
          and the <em>Limitations Act, 2002</em> (Ontario).
        </li>
        <li>
          <strong style={{ color: '#ffffff' }}>Payment and billing records</strong> — retained for 7 years
          as required by the <em>Income Tax Act</em> (Canada) and CRA guidelines.
        </li>
      </ul>
      <p style={{ marginTop: '12px' }}>
        All retained data is held securely and used solely for the purpose of legal compliance. It is
        not used for marketing, advertising, or any other purpose.
      </p>

      <div style={{
        background: 'rgba(37,99,235,0.08)',
        border: '1px solid rgba(37,99,235,0.2)',
        borderRadius: '10px',
        padding: '16px 20px',
        marginTop: '40px',
        fontSize: '14px',
        color: '#94a3b8',
      }}>
        For questions about your data or this process, contact our Privacy Officer at{' '}
        <a href="mailto:info@roadright.ca" style={{ color: '#3b82f6' }}>info@roadright.ca</a>.
        For more information on how we handle your data, see our{' '}
        <a href="/privacy" style={{ color: '#3b82f6' }}>Privacy Policy</a>.
      </div>
    </main>
  )
}

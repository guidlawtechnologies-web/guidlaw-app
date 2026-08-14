export default function PrivacyPolicy() {
  const h2 = {
    fontSize: '22px',
    fontWeight: 600,
    color: '#ffffff',
    marginTop: '48px',
    marginBottom: '12px',
  } as const

  const h3 = {
    fontSize: '17px',
    fontWeight: 600,
    color: '#ffffff',
    marginTop: '28px',
    marginBottom: '8px',
  } as const

  const ul = { paddingLeft: '24px', marginBottom: '12px' } as const
  const strong = { color: '#ffffff' } as const
  const link = { color: '#3b82f6' } as const
  const note = {
    background: 'rgba(37,99,235,0.08)',
    border: '1px solid rgba(37,99,235,0.2)',
    borderRadius: '10px',
    padding: '16px 20px',
    marginTop: '16px',
    marginBottom: '16px',
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#94a3b8',
  } as const
  const warn = {
    background: 'rgba(245,158,11,0.08)',
    border: '1px solid rgba(245,158,11,0.25)',
    borderRadius: '10px',
    padding: '16px 20px',
    marginTop: '16px',
    marginBottom: '16px',
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#fbbf24',
  } as const

  return (
    <main style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '60px 24px 80px',
      color: '#e2e8f0',
      fontFamily: "'Outfit', sans-serif",
      lineHeight: '1.75',
    }}>
      <h1 style={{ fontSize: '34px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
        Privacy Policy
      </h1>
      <p style={{ color: '#64748b', marginBottom: '8px' }}>Last updated: July 21, 2026</p>
      <p style={{ color: '#475569', fontSize: '13px', marginBottom: '40px' }}>
        Effective date: July 21, 2026 &nbsp;·&nbsp; Version 1.1
      </p>

      {/* Intro */}
      <p>
        GuidLaw Technologies Inc. ("<strong style={strong}>GuidLaw</strong>", "we", "us", or "our") is a Canadian
        corporation incorporated under the laws of Ontario. We operate a platform that connects drivers with
        licensed paralegals and lawyers regulated by the Law Society of Ontario (LSO) via our website at{' '}
        <a href="https://guidlaw.ca" style={link}>guidlaw.ca</a> and our mobile application
        (collectively, the "<strong style={strong}>Service</strong>").
      </p>
      <p style={{ marginTop: '16px' }}>
        Because our Service involves sensitive legal interactions — including live video consultations during
        active traffic stops and the submission of traffic ticket information — we take privacy seriously and
        hold ourselves to a higher standard than a typical software application.
      </p>
      <p style={{ marginTop: '16px' }}>
        This Privacy Policy is drafted in compliance with the{' '}
        <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA), the{' '}
        <em>Freedom of Information and Protection of Privacy Act</em> (FIPPA) (Ontario), the LSO's Rules of
        Professional Conduct and Paralegal Rules of Conduct regarding client confidentiality, and, where
        applicable, Quebec's <em>Act Respecting the Protection of Personal Information in the Private Sector</em>{' '}
        (Law 25 / Bill 64). By using our Service, you consent to the practices described in this policy.
      </p>

      {/* Important Notice */}
      <div style={warn}>
        <strong style={{ color: '#fbbf24' }}>Important — Legal Privilege Notice:</strong> Communications
        facilitated through GuidLaw between you and a participating paralegal or lawyer are intended to
        provide immediate legal guidance. However, depending on the circumstances, the short-form nature of
        a traffic stop consultation may limit the scope of solicitor-client or paralegal-client privilege
        that would otherwise apply. GuidLaw is a technology platform, not a law firm. The privilege, if
        any, belongs to you and your legal professional — not to GuidLaw. You should treat communications
        through the Service as potentially discoverable (meaning it could be obtained by opposing parties
        in legal proceedings) and consult independent legal counsel for matters requiring full privilege
        protection.
      </div>

      {/* 1 */}
      <h2 style={h2}>1. Accountability</h2>
      <p>
        GuidLaw Technologies Inc. is accountable for all personal information under its control, including
        information transferred to third-party service providers for processing. Our privacy officer is
        responsible for our compliance with this policy and PIPEDA. To reach our privacy officer, contact{' '}
        <a href="mailto:info@guidlaw.ca" style={link}>info@guidlaw.ca</a>.
      </p>

      {/* 2 */}
      <h2 style={h2}>2. Information We Collect and Why</h2>
      <p>
        We collect only the personal information necessary for the identified purposes below. We do not
        collect information indiscriminately.
      </p>

      <h3 style={h3}>2.1 Information You Provide Directly</h3>
      <ul style={ul}>
        <li><strong style={strong}>Account information:</strong> Full name and email address, required to create and manage your account.</li>
        <li><strong style={strong}>Phone number:</strong> Optional, used for account verification and case notifications.</li>
        <li><strong style={strong}>Traffic ticket information:</strong> Ticket photos, offence details, court dates, and related documentation you submit when requesting paralegal services. Ticket photos typically contain sensitive government identifiers including your <strong style={strong}>driver's licence number, home address, date of birth, and vehicle plate number</strong>. This information is treated with heightened care, shared only with the paralegal or lawyer handling your matter, and is never used for any purpose other than your legal representation.</li>
        <li><strong style={strong}>Payment information:</strong> Processed exclusively by Stripe, Inc. (a PCI-DSS Level 1 certified processor). GuidLaw never receives, stores, or has access to your full card number, CVV, or banking credentials.</li>
        <li><strong style={strong}>Communications:</strong> Messages, support requests, and correspondence you send us through the Service or by email.</li>
      </ul>

      <h3 style={h3}>2.2 Video and Audio Recordings</h3>
      <div style={note}>
        <strong style={{ color: '#e2e8f0' }}>Recording Policy — Please read carefully.</strong> Our Service
        may facilitate live video consultations between you and a licensed paralegal or lawyer during a
        traffic stop or after receiving a ticket. The following rules govern all recordings:
      </div>
      <ul style={ul}>
        <li><strong style={strong}>Ownership:</strong> All video and audio recordings of your consultations belong solely to you.</li>
        <li><strong style={strong}>Access:</strong> GuidLaw does not access, view, listen to, review, download, or retrieve your recordings for any purpose — including analytics, product improvement, advertising, or AI training. Recordings are accessible only through your account.</li>
        <li><strong style={strong}>Paralegal access:</strong> The paralegal or lawyer connected to your session cannot access recordings after the session ends unless you independently share them.</li>
        <li><strong style={strong}>Retention:</strong> Recordings are stored in encrypted cloud storage for up to 90 days from the date of the session, after which they are automatically and permanently deleted. You are strongly encouraged to download recordings to your own device immediately after a session.</li>
        <li><strong style={strong}>Consent:</strong> By initiating a video consultation through the Service, you consent to the recording of that session and acknowledge that all parties to the call have been informed of, and have consented to, the recording.</li>
        <li><strong style={strong}>Law enforcement:</strong> We will not voluntarily provide recordings to law enforcement. We will only disclose recordings if compelled by a valid court order, subpoena, or other lawful process issued by a Canadian court, and we will notify you in advance where legally permitted to do so.</li>
      </ul>

      <h3 style={h3}>2.3 Information Collected Automatically</h3>
      <ul style={ul}>
        <li><strong style={strong}>Device information:</strong> Device type, operating system, browser type, and unique device identifiers.</li>
        <li><strong style={strong}>IP address and approximate location:</strong> Province- or city-level location derived from your IP address, used to match you with paralegals licensed in the correct jurisdiction. We do not collect precise GPS location.</li>
        <li><strong style={strong}>Usage data:</strong> Pages visited, features used, session duration, and error logs. Used solely to operate and improve the Service.</li>
        <li><strong style={strong}>Push notification tokens:</strong> If you enable notifications, a device token is stored to deliver case status updates. You can disable notifications at any time through your device settings.</li>
      </ul>

      <h3 style={h3}>2.4 Information We Do Not Collect</h3>
      <ul style={ul}>
        <li>We do not collect race, ethnicity, religion, sexual orientation, or political beliefs.</li>
        <li>We do not use tracking pixels, third-party advertising networks, or behavioural analytics.</li>
        <li>We do not collect information from social media accounts.</li>
        <li>We do not build advertising profiles.</li>
      </ul>

      {/* 3 */}
      <h2 style={h2}>3. How We Use Your Information</h2>
      <p>We use personal information only for the purposes for which it was collected:</p>
      <ul style={ul}>
        <li>To create, maintain, and secure your account</li>
        <li>To connect you with a licensed Ontario paralegal or lawyer appropriate to your jurisdiction and matter</li>
        <li>To facilitate video consultations and manage your case file</li>
        <li>To process payments for paralegal services through Stripe</li>
        <li>To send you case status updates, court date reminders, and Service notifications</li>
        <li>To respond to your support requests and communications</li>
        <li>To detect, prevent, and investigate fraud, abuse, or security incidents</li>
        <li>To comply with our legal and regulatory obligations under applicable Canadian law</li>
        <li>To improve the reliability and performance of the Service using aggregated, de-identified usage data</li>
      </ul>
      <p>
        <strong style={strong}>We do not sell your personal information.</strong> We do not use your
        information for advertising, profiling, or any purpose unrelated to delivering the Service.
      </p>

      {/* 4 */}
      <h2 style={h2}>4. Disclosure of Your Information</h2>
      <p>We share personal information only in the following limited circumstances:</p>
      <ul style={ul}>
        <li>
          <strong style={strong}>Licensed paralegals and lawyers:</strong> Your ticket details, relevant
          case documents, and session information are shared with the LSO-licensed paralegal or lawyer
          assigned to your matter, solely for the purpose of providing legal services. These professionals
          are independently bound by the LSO's Rules of Conduct regarding client confidentiality and are
          prohibited from disclosing your information except as required by law.
        </li>
        <li>
          <strong style={strong}>Service providers (processors):</strong> We engage the following
          sub-processors who handle data strictly on our behalf under data processing agreements:
          <ul style={{ ...ul, marginTop: '8px' }}>
            <li><strong style={strong}>Supabase, Inc.</strong> (database and authentication) — data may be stored on servers located in the United States</li>
            <li><strong style={strong}>Stripe, Inc.</strong> (payment processing) — subject to Stripe's own privacy policy and PCI-DSS standards</li>
            <li><strong style={strong}>Resend, Inc.</strong> (transactional email) — email delivery only</li>
          </ul>
        </li>
        <li>
          <strong style={strong}>Ontario courts and tribunals (as part of your representation):</strong> When
          a paralegal or lawyer represents you in fighting a traffic ticket, they are required to file
          documents with the Ontario Court of Justice, communicate with the Crown Attorney or prosecution,
          and appear in proceedings on your behalf. This necessarily involves disclosing your name, ticket
          details, and relevant case information to those bodies as a normal and expected part of the legal
          process. These disclosures are made at your direction and for your benefit. Court filings become
          part of the public record of those proceedings, which is outside GuidLaw's control.
        </li>
        <li>
          <strong style={strong}>Legal obligations:</strong> We may disclose information if required by a
          valid court order, subpoena, search warrant, or other lawful legal process issued by a Canadian
          court or tribunal. We will notify you before complying where we are legally permitted to do so.
        </li>
        <li>
          <strong style={strong}>Safety:</strong> We may disclose information where we have reasonable
          grounds to believe disclosure is necessary to prevent imminent harm to you or another person.
        </li>
        <li>
          <strong style={strong}>Business transfer:</strong> If GuidLaw is acquired, merged, or undergoes
          a restructuring, your information may be transferred to the successor entity. You will be notified
          of any such change and given the opportunity to delete your account before the transfer.
        </li>
      </ul>

      {/* 5 */}
      <h2 style={h2}>5. Cross-Border Data Transfers</h2>
      <p>
        Some of our third-party service providers (including Supabase and Stripe) are based in or store
        data in the United States. When your information is transferred outside Canada, it becomes subject
        to the laws of the destination country, including laws that may allow access by foreign governments.
        We take reasonable contractual steps to ensure your information receives comparable protection
        to that required under PIPEDA, but we cannot guarantee equivalent protection in all circumstances.
        By using our Service, you acknowledge this cross-border transfer.
      </p>
      <p style={{ marginTop: '12px' }}>
        We do not transfer personal information to jurisdictions other than Canada and the United States
        without your explicit consent or a legal requirement to do so.
      </p>

      {/* 6 */}
      <h2 style={h2}>6. Data Retention</h2>
      <ul style={ul}>
        <li><strong style={strong}>Account information:</strong> Retained for the duration of your active account. Upon account deletion, personal information is purged within 30 days, subject to the exceptions below.</li>
        <li><strong style={strong}>Ticket and case files:</strong> Retained for a minimum of 7 years from the date the matter is closed, as required by paralegal recordkeeping obligations under the LSO's By-Laws and the Limitations Act, 2002 (Ontario).</li>
        <li><strong style={strong}>Video and audio recordings:</strong> Retained for 90 days from the session date, then permanently deleted. See Section 2.2.</li>
        <li><strong style={strong}>Payment records:</strong> Retained for 7 years as required by the Income Tax Act (Canada) and applicable CRA guidelines.</li>
        <li><strong style={strong}>Usage and log data:</strong> Retained for up to 12 months for security and operational purposes, then deleted or anonymized.</li>
      </ul>

      {/* 7 */}
      <h2 style={h2}>7. Data Security</h2>
      <p>
        We implement technical, administrative, and physical safeguards appropriate to the sensitivity of
        the information we hold, including:
      </p>
      <ul style={ul}>
        <li>Encrypted data transmission using HTTPS/TLS 1.2 or higher for all data in transit</li>
        <li>Encrypted storage for data at rest via our database provider</li>
        <li>Role-based access controls limiting internal access to personal information on a need-to-know basis</li>
        <li>Secure authentication including hashed passwords and optional multi-factor authentication</li>
        <li>Regular security reviews of our infrastructure and third-party providers</li>
      </ul>
      <p style={{ marginTop: '12px' }}>
        No method of electronic transmission or storage is completely secure. In the event of a security
        breach that creates a real risk of significant harm to you, we will notify you and the Office of
        the Privacy Commissioner of Canada as soon as feasible, as required under PIPEDA's Breach of
        Security Safeguards Regulations.
      </p>

      {/* 8 */}
      <h2 style={h2}>8. Cookies and Tracking</h2>
      <p>
        We use only strictly necessary session cookies required to authenticate you and maintain your
        logged-in session. We do not use:
      </p>
      <ul style={ul}>
        <li>Third-party advertising cookies</li>
        <li>Behavioural tracking or retargeting technologies</li>
        <li>Analytics services that transmit identifiable data to third parties (e.g., Google Analytics)</li>
        <li>Fingerprinting or device tracking technologies</li>
      </ul>
      <p>
        You may disable cookies in your browser settings. Doing so will prevent you from logging in to
        the Service.
      </p>
      <p style={{ marginTop: '12px' }}>
        Our Service does not respond to "Do Not Track" signals transmitted by web browsers. Because there
        is no industry-wide standard for interpreting these signals, we cannot act on them at this time.
      </p>

      {/* 9 */}
      <h2 style={h2}>9. Your Rights Under PIPEDA</h2>
      <p>
        As a resident of Canada, you have the following rights regarding your personal information:
      </p>
      <ul style={ul}>
        <li><strong style={strong}>Right of access:</strong> Request a copy of the personal information we hold about you, and information about how it has been used and disclosed.</li>
        <li><strong style={strong}>Right to correction:</strong> Request correction of inaccurate or incomplete personal information.</li>
        <li><strong style={strong}>Right to withdraw consent:</strong> Withdraw consent to our collection, use, or disclosure of your information at any time, subject to legal and contractual obligations. Withdrawal of consent may prevent us from continuing to provide the Service.</li>
        <li><strong style={strong}>Right to deletion:</strong> Request deletion of your account and associated personal information (subject to our legal retention obligations outlined in Section 6).</li>
        <li><strong style={strong}>Right to complain:</strong> Lodge a complaint with the Office of the Privacy Commissioner of Canada (OPC) at <a href="https://www.priv.gc.ca" style={link}>priv.gc.ca</a> or by calling 1-800-282-1376, or with the Information and Privacy Commissioner of Ontario (IPC) at <a href="https://www.ipc.on.ca" style={link}>ipc.on.ca</a>.</li>
      </ul>
      <p>
        <strong style={strong}>Quebec residents</strong> have additional rights under Law 25, including the
        right to data portability and the right to be informed of automated decision-making. If you are a
        Quebec resident and wish to exercise these rights, please contact us.
      </p>
      <p style={{ marginTop: '12px' }}>
        To exercise any of the above rights, submit a written request to{' '}
        <a href="mailto:info@guidlaw.ca" style={link}>info@guidlaw.ca</a>. We will respond within{' '}
        <strong style={strong}>30 days</strong> of receiving your request. We may require identity
        verification before processing your request.
      </p>

      {/* 10 */}
      <h2 style={h2}>10. Children's Privacy</h2>
      <p>
        The Service is intended for individuals 18 years of age and older. We do not knowingly collect
        personal information from anyone under the age of 18. If you believe a minor has provided us with
        personal information, contact us at{' '}
        <a href="mailto:info@guidlaw.ca" style={link}>info@guidlaw.ca</a> and we will delete it
        promptly.
      </p>

      {/* 11 */}
      <h2 style={h2}>11. Paralegal and Lawyer Confidentiality</h2>
      <p>
        Paralegals and lawyers who use the GuidLaw platform to provide services to drivers are
        independently regulated by the Law Society of Ontario and are bound by the LSO's Paralegal Rules
        of Conduct and Rules of Professional Conduct, respectively. These rules impose strict duties of
        confidentiality that exist independently of this Privacy Policy. GuidLaw requires all
        participating legal professionals to enter into agreements that reinforce these obligations in the
        context of our platform.
      </p>
      <p style={{ marginTop: '12px' }}>
        Notwithstanding the above, legal professionals on the platform do not have access to your
        recordings, payment information, or account data beyond what is necessary to handle your specific
        matter.
      </p>

      {/* 12 */}
      <h2 style={h2}>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or
        applicable law. We will notify you of material changes by email (to the address associated with
        your account) and by posting a prominent notice on our website at least 14 days before the change
        takes effect. Your continued use of the Service after the effective date constitutes acceptance of
        the updated policy. If you do not accept the changes, you may close your account before the
        effective date.
      </p>

      {/* 13 */}
      <h2 style={h2}>13. Contact Us</h2>
      <p>
        Questions, concerns, or requests regarding this Privacy Policy or our handling of your personal
        information should be directed to:
      </p>
      <p style={{ marginTop: '16px', lineHeight: '2' }}>
        <strong style={strong}>Privacy Officer</strong><br />
        GuidLaw Technologies Inc.<br />
        Email: <a href="mailto:info@guidlaw.ca" style={link}>info@guidlaw.ca</a><br />
        Website: <a href="https://guidlaw.ca" style={link}>guidlaw.ca</a><br />
        Ontario, Canada
      </p>
      <p style={{ marginTop: '16px' }}>
        If you are not satisfied with our response, you have the right to contact the Office of the
        Privacy Commissioner of Canada at <a href="https://www.priv.gc.ca" style={link}>priv.gc.ca</a>.
      </p>
    </main>
  )
}

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>We collect account information, trip preferences, and booking data to provide our services. We do not sell personal data to third parties.</p>
      <p>API keys and payment credentials are stored server-side or in environment variables — never in public repositories.</p>
      <p>Contact hello@tripcraft.in for data deletion requests.</p>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>By using TripCraft India you agree to our booking policies, cancellation terms, and acceptable use guidelines.</p>
      <p>Prices shown are estimates until confirmed at checkout. Third-party hotel and flight providers may change availability.</p>
      <p>Demo payments do not constitute real travel bookings unless connected to production payment gateways.</p>
    </LegalLayout>
  );
}

function LegalLayout({ title, children }) {
  return (
    <div className="section-padding max-w-3xl mx-auto">
      <h1 className="heading-display text-4xl font-bold mb-8">{title}</h1>
      <div className="space-y-4 text-slate-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

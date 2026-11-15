'use client';

import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion';
import { Container, Eyebrow } from '@/components/ui';
import { type Site, useSite } from '@/lib/site';

/**
 * Policy pages. The company's facts (name, address, grievance officer, refund
 * days...) and any extra text come from Super Admin › Website; the standard
 * wording is here. Extra text is shown as plain paragraphs (no HTML).
 */
function PolicyShell({ title, updated, extra, children }: { title: string; updated: string; extra: string | null; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora opacity-60" />
      <Container className="relative max-w-3xl pt-16 pb-10">
        <Reveal>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">Last updated {new Date(updated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="prose-calm mt-10 rounded-[28px] border border-line bg-white p-7 shadow-soft sm:p-10">
            {children}
            {extra && (
              <>
                <h2>Additional terms</h2>
                {extra
                  .split(/\n\s*\n/)
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .map((p, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {p}
                    </p>
                  ))}
              </>
            )}
          </article>
        </Reveal>
      </Container>
    </section>
  );
}

function who(s: Site) {
  const c = s.company;
  return (
    <>
      <strong>{c.legalName}</strong>
      {s.contact.address ? `, ${s.contact.address}` : ''}
      {c.cin ? ` (CIN ${c.cin})` : ''}
    </>
  );
}
const mail = (e: string | null) => (e ? <a href={`mailto:${e}`}>{e}</a> : 'the email address on our Contact page');

export function PrivacyPage() {
  const { site: s } = useSite();
  return (
    <PolicyShell title="Privacy policy" updated={s.policies.updatedOn} extra={s.policies.privacyExtra}>
      <p>
        This policy explains how {who(s)} (&ldquo;{s.brandName}&rdquo;, &ldquo;we&rdquo;) collects, uses and protects personal data when schools, their staff, parents and
        students use our website, web portal and mobile apps (the &ldquo;Service&rdquo;). It is written to meet the Information Technology Act, 2000, the IT (Reasonable
        Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and the Digital Personal Data Protection Act, 2023.
      </p>
      <h2>1. Who is responsible for the data</h2>
      <p>
        Each school decides what data about its students, parents and staff is entered into the Service and why. For that data the school is the data fiduciary and we act as
        its data processor, following the school&apos;s instructions. For data we collect for ourselves (for example when a school signs up on this website or contacts us),
        we are the data fiduciary.
      </p>
      <h2>2. What we collect</h2>
      <ul>
        <li>School and contact details given at sign-up: school name, city, board, contact name, designation, mobile number and email.</li>
        <li>Data the school enters: student and guardian details, attendance, marks, fees, staff and payroll records, health notes, transport and other module data.</li>
        <li>Account data: login identifiers, hashed passwords, device and session information, and an audit log of important actions.</li>
        <li>Location of a school bus while a driver has a trip running (only to show it to the school and parents).</li>
        <li>Payment references from payment gateways. We do not store card or bank passwords.</li>
      </ul>
      <h2>3. How we use it</h2>
      <ul>
        <li>To provide the Service to the school and the people it invites, and to send the notifications the school has switched on.</li>
        <li>To verify sign-ups, prevent misuse and keep the Service secure.</li>
        <li>To bill the school for its subscription and to provide support.</li>
        <li>To improve the Service using aggregated data that does not identify any person.</li>
      </ul>
      <p>We never sell personal data and we do not use students&apos; data for advertising.</p>
      <h2>4. Children&apos;s data</h2>
      <p>
        Most students are children. Their data is entered and controlled by their school, which is responsible for obtaining verifiable consent from a parent or guardian where
        the law requires it. We do not track children for advertising or build behavioural profiles of them.
      </p>
      <h2>5. AI features (Smart Learning)</h2>
      <p>
        When a school uses Smart Learning, only chapter details (board, class, subject, chapter title and topics) and a student&apos;s doubt text are sent to the AI tool the
        school has chosen. Student names, marks and contact details are never sent.
      </p>
      <h2>6. Sharing</h2>
      <p>
        We share data only with service providers that help us run the Service (hosting, SMS / WhatsApp / email delivery, push notifications, maps, payment gateways, AI tools
        chosen by the school), under contracts that require them to protect it, or when the law requires us to.
      </p>
      <h2>7. Security</h2>
      <p>
        Each school&apos;s data is kept separate at the database level, data travels over encrypted connections, offline copies on devices are encrypted, passwords are hashed,
        and important changes are logged. See our <a href="/security/">Security page</a>.
      </p>
      <h2>8. Keeping and deleting data</h2>
      <p>
        We keep a school&apos;s data while its account is active. When a school leaves, it can ask for an export; we delete or anonymise the data within 90 days unless the
        law requires us to keep some of it (for example invoices).
      </p>
      <h2>9. Your rights</h2>
      <p>
        You can ask to see, correct or erase your personal data, or withdraw consent. Parents, students and staff should usually contact their school first, as the school
        controls that data; we will help the school respond. You may also contact our Grievance Officer.
      </p>
      <h2>10. Grievance Officer</h2>
      <p>
        {s.company.grievanceName ? <strong>{s.company.grievanceName}</strong> : 'Our Grievance Officer'}, {s.company.legalName}
        {s.contact.address ? `, ${s.contact.address}` : ''}. Email: {mail(s.company.grievanceEmail)}. We acknowledge complaints within 24 hours and resolve them within 30 days.
      </p>
      <h2>11. Changes</h2>
      <p>We may update this policy. We will show the new date above and tell schools about important changes.</p>
    </PolicyShell>
  );
}

export function TermsPage() {
  const { site: s } = useSite();
  return (
    <PolicyShell title="Terms & conditions" updated={s.policies.updatedOn} extra={s.policies.termsExtra}>
      <p>
        These terms are an agreement between {who(s)} (&ldquo;{s.brandName}&rdquo;, &ldquo;we&rdquo;) and the school or organisation that signs up (&ldquo;the School&rdquo;) for
        the use of our school management software, apps and related services (the &ldquo;Service&rdquo;). By signing up or using the Service, the School agrees to them.
      </p>
      <h2>1. Accounts and approval</h2>
      <ul>
        <li>Sign-ups are reviewed by us. We may approve or decline a sign-up at our discretion.</li>
        <li>The person signing up confirms they are authorised to act for the School.</li>
        <li>The School is responsible for the users it invites and for keeping login details secret.</li>
      </ul>
      <h2>2. Free trial</h2>
      <p>
        An approved School gets a free trial of {s.trialDays} days with the features of the chosen plan. At the end of the trial the School may subscribe; otherwise the account
        becomes read-only. Trial data is kept for at least 30 days so the School can subscribe without losing work.
      </p>
      <h2>3. Plans, fees and taxes</h2>
      <ul>
        <li>Fees are per active student for the billing period, as shown on our Pricing page or agreed in writing, and are billed yearly in advance unless agreed otherwise.</li>
        <li>Prices are exclusive of GST and other applicable taxes, which are added to invoices.</li>
        <li>Message packs (SMS / WhatsApp) and AI credits are charged as shown in the app.</li>
        <li>We may change prices with at least 30 days&apos; notice; changes apply from the next billing period.</li>
      </ul>
      <h2>4. Non-payment</h2>
      <p>
        If an invoice is not paid by its due date, after a short grace period the account becomes read-only until payment. We do not delete a School&apos;s data for
        non-payment while the account remains open.
      </p>
      <h2>5. The School&apos;s data</h2>
      <p>
        The School owns its data. The School is responsible for having a lawful basis and any consent needed (including from parents for children&apos;s data) before entering
        it. We process it only to provide the Service, as described in our <a href="/privacy/">Privacy policy</a>. The School may export its data at any time.
      </p>
      <h2>6. Acceptable use</h2>
      <ul>
        <li>No unlawful, harmful or misleading content, spam or messages without the recipient&apos;s consent.</li>
        <li>No attempts to access other schools&apos; data, break security or overload the Service.</li>
        <li>No resale or copying of the Service without our written permission.</li>
      </ul>
      <h2>7. Third-party services</h2>
      <p>
        Payment gateways, SMS / WhatsApp providers, maps and AI tools are provided by third parties under their own terms. When a School connects its own accounts or keys, it
        is responsible for those accounts and their charges.
      </p>
      <h2>8. AI-generated content</h2>
      <p>
        Smart Learning content is generated by AI and must be reviewed and approved by the School&apos;s teachers before students see it. The School is responsible for the
        content it approves. AI output may contain mistakes; please report them using the app.
      </p>
      <h2>9. Availability and support</h2>
      <p>
        We aim to keep the Service available at all times and announce planned maintenance in advance, but we do not guarantee uninterrupted service. Support is available
        through the contact details on our website.
      </p>
      <h2>10. Liability</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo;. To the extent the law allows, we are not liable for indirect or consequential losses, and our total liability for any claim
        is limited to the fees paid by the School in the 12 months before the claim.
      </p>
      <h2>11. Ending the agreement</h2>
      <p>
        The School may stop using the Service at any time; see our <a href="/refund/">Refund &amp; cancellation policy</a>. We may suspend or end an account that breaks these
        terms, after notice where reasonable. On request we provide an export of the School&apos;s data.
      </p>
      <h2>12. Law and disputes</h2>
      <p>
        These terms are governed by the laws of India. Courts at {s.company.jurisdiction ?? 'the city of our registered office'} have exclusive jurisdiction.
      </p>
      <h2>13. Contact</h2>
      <p>Questions about these terms: {mail(s.contact.supportEmail)}.</p>
    </PolicyShell>
  );
}

export function RefundPage() {
  const { site: s } = useSite();
  return (
    <PolicyShell title="Refund & cancellation" updated={s.policies.updatedOn} extra={s.policies.refundExtra}>
      <p>
        This policy applies to subscriptions bought from {who(s)}. We want every school to be happy with {s.brandName}, which is why every school can try it free for{' '}
        {s.trialDays} days first.
      </p>
      <h2>1. Free trial</h2>
      <p>The trial is free and needs no payment. Nothing is charged if a school does not subscribe.</p>
      <h2>2. Cancellation</h2>
      <ul>
        <li>A school can cancel at any time by writing to {mail(s.contact.supportEmail)} from its registered email or mobile.</li>
        <li>After cancellation the account stays active until the end of the paid period, then becomes read-only. We provide a data export on request.</li>
      </ul>
      <h2>3. Refunds</h2>
      <ul>
        <li>
          <strong>New subscription:</strong> if a school asks within {s.refundDays} days of its first payment, we refund the full subscription amount.
        </li>
        <li>
          <strong>After {s.refundDays} days:</strong> subscription fees are not refundable for the current billing period, except where the law requires or we agree in writing.
        </li>
        <li>
          <strong>Message packs and AI credits</strong> that have been used are not refundable. Unused packs bought by mistake can be refunded within {s.refundDays} days.
        </li>
        <li>
          <strong>Duplicate or failed payments</strong> are refunded in full.
        </li>
      </ul>
      <h2>4. How refunds are paid</h2>
      <p>
        Approved refunds are made to the original payment method within 7–10 working days of approval. Bank or gateway processing times may add a few days. GST is refunded or
        adjusted with a credit note as the law allows.
      </p>
      <h2>5. Fees collected by schools</h2>
      <p>
        School fees, application fees and canteen top-ups that parents pay to their school through {s.brandName} are received by the school&apos;s own payment account. Refunds
        of those payments are decided by the school; please contact the school.
      </p>
      <h2>6. Contact</h2>
      <p>For refunds or cancellations write to {mail(s.contact.supportEmail)}.</p>
    </PolicyShell>
  );
}

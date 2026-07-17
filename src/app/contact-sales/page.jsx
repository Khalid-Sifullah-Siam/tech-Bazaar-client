import {
  ArrowLeft,
  Building2,
  CalendarClock,
  CheckCircle2,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Enterprise Sales | Tech Bazaar",
  description: "Contact the Tech Bazaar sales team for enterprise seller plans, custom integrations, onboarding, and dedicated support.",
};

const benefits = [
  { icon: Building2, title: "Custom seller plan", text: "A package tailored to your catalog size, sales volume, and business goals." },
  { icon: Headphones, title: "Dedicated support", text: "Work with a dedicated account manager throughout onboarding and growth." },
  { icon: ShieldCheck, title: "Secure integrations", text: "Discuss API access, inventory sync, payment operations, and custom workflows." },
];

const steps = [
  "Share your business size, product categories, and estimated catalog volume.",
  "Our sales team reviews your requirements and schedules a discovery call.",
  "Receive a tailored plan, onboarding timeline, and transparent pricing proposal.",
];

export default function ContactSalesPage() {
  return (
    <main className="relative overflow-hidden bg-linear-to-b from-orange-50 via-white to-white px-4 py-12 sm:py-20">
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-96 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground">
          <ArrowLeft size={17} /> Back to seller plans
        </Link>

        <section className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-1.5 text-sm font-semibold text-orange-700">
              Enterprise seller support
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-gray-950 sm:text-6xl">
              Let&apos;s build a plan around your business.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Whether you manage a large catalog, need custom integrations, or want hands-on onboarding, our sales team will help you launch and scale on Tech Bazaar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:sales@techbazaar.com" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-600">
                <Mail size={19} /> Email sales
              </a>
              <a href="tel:+8801700000000" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:border-orange-300 hover:bg-orange-50">
                <Phone size={19} /> Call sales
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100/50 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">Contact details</p>
            <div className="mt-6 space-y-6">
              <a href="mailto:sales@techbazaar.com" className="flex gap-4 rounded-2xl p-2 transition hover:bg-orange-50">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-700"><Mail size={20} /></span>
                <span><strong className="block text-gray-950">Email</strong><span className="text-sm text-gray-600">sales@techbazaar.com</span></span>
              </a>
              <a href="tel:+8801700000000" className="flex gap-4 rounded-2xl p-2 transition hover:bg-orange-50">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-700"><Phone size={20} /></span>
                <span><strong className="block text-gray-950">Phone</strong><span className="text-sm text-gray-600">+880 1700 000 000</span></span>
              </a>
              <div className="flex gap-4 p-2">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-700"><CalendarClock size={20} /></span>
                <span><strong className="block text-gray-950">Business hours</strong><span className="text-sm text-gray-600">Saturday - Thursday, 9:00 AM - 6:00 PM</span></span>
              </div>
              <div className="flex gap-4 p-2">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-700"><MapPin size={20} /></span>
                <span><strong className="block text-gray-950">Sales office</strong><span className="text-sm text-gray-600">Dhaka, Bangladesh</span></span>
              </div>
            </div>
            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-green-50 p-4 text-sm text-green-900">
              <MessageCircle className="mt-0.5 shrink-0" size={18} /> We usually respond within one business day.
            </div>
          </aside>
        </section>

        <section className="mt-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">Enterprise advantage</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">More than a seller subscription</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-orange-700"><Icon size={22} /></span>
                <h3 className="mt-5 text-xl font-bold text-gray-950">{title}</h3>
                <p className="mt-2 leading-7 text-gray-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-8 rounded-3xl bg-gray-950 p-7 text-white sm:p-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-400">What happens next</p>
            <h2 className="mt-3 text-3xl font-bold">A straightforward onboarding process</h2>
            <p className="mt-4 leading-7 text-gray-300">Come prepared with your catalog size, expected monthly orders, integration needs, and target launch date.</p>
          </div>
          <ol className="space-y-5">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-500 font-bold">{index + 1}</span>
                <span className="pt-1 text-gray-200">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl border border-orange-200 bg-orange-50 p-7 sm:flex-row sm:items-center sm:p-9">
          <div>
            <div className="flex items-center gap-2 font-semibold text-orange-700"><CheckCircle2 size={19} /> No commitment required</div>
            <h2 className="mt-2 text-2xl font-bold text-gray-950">Tell us what your business needs.</h2>
          </div>
          <a href="mailto:sales@techbazaar.com?subject=Enterprise%20Seller%20Inquiry" className="shrink-0 rounded-xl bg-orange-600 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-700">
            Start a conversation
          </a>
        </section>
      </div>
    </main>
  );
}

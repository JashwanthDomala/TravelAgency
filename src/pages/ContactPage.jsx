import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", { y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
    }, formRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you within 24 hours.");
  };

  return (
    <div ref={formRef} className="section-padding max-w-7xl mx-auto">
      <h1 className="contact-reveal heading-display text-4xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="contact-reveal glass rounded-3xl p-8 space-y-4">
          <input
            placeholder="Your name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500"
          />
          <textarea
            placeholder="Message"
            rows={5}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 resize-none"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-500 to-amber-600 text-surface-900 font-semibold py-3 rounded-full hover:shadow-lg transition-shadow"
          >
            Send Message
          </button>
        </form>

        <div className="contact-reveal space-y-6">
          <div className="glass rounded-2xl p-6 flex gap-4">
            <FaEnvelope className="text-brand-400 text-xl shrink-0" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-slate-400 text-sm">hello@tripcraft.in</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-6 flex gap-4">
            <FaPhone className="text-brand-400 text-xl shrink-0" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-slate-400 text-sm">+91 98765 43210</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-6 flex gap-4">
            <FaMapMarkerAlt className="text-brand-400 text-xl shrink-0" />
            <div>
              <p className="font-medium">Office</p>
              <p className="text-slate-400 text-sm">Bengaluru, Karnataka, India</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden h-64">
            <iframe
              title="Office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539!2d77.490852!3d12.954517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"
import React from "react";
import { FireBackground } from "@/components/ui/fire-background";

const testimonials = [
  {
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=75",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=75",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=75",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=75",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=75",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=75",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=75",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=75",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=75",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

/**
 * Testimonial column using CSS animation instead of framer-motion.
 * Uses the .testimonial-marquee class defined in globals.css.
 */
function TestimonialColumn({ 
  testimonials, 
  className = "", 
  duration = 15 
}: { 
  testimonials: typeof firstColumn; 
  className?: string; 
  duration?: number 
}) {
  return (
    <div className={className}>
      <div
        className="flex flex-col gap-6 pb-6 testimonial-marquee"
        style={{ ["--scroll-duration" as any]: `${duration}s` }}
      >
        {/* Duplicate content for seamless loop */}
        {[0, 1].map((copyIndex) => (
          <React.Fragment key={copyIndex}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div 
                className="p-10 rounded-3xl border shadow-lg max-w-xs w-full bg-white/[0.03] border-white/10 hover:border-[var(--hive-gold)]/40 hover:shadow-[0_0_20px_rgba(212,160,23,0.15)] transition-all duration-300 text-white" 
                key={`${copyIndex}-${i}`}
              >
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">{name}</div>
                    <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="my-10 sm:my-16 relative pt-12 sm:pt-16 md:pt-20">
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <FireBackground />

      <div className="container z-10 mx-auto relative flex flex-col items-center mb-12 px-4">
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center">
          <div className="flex justify-center mb-3">
            <span className="inline-block text-white/50 text-xs sm:text-sm font-semibold uppercase tracking-widest py-1 px-4 border border-white/10 bg-white/5 rounded-lg">Testimonials</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight drop-shadow-md">
            What our users say
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto text-pretty mt-2">
            See what our customers have to say about us.
          </p>
        </div>

        {/* Testimonials Wrapper */}
        <div className="mt-6 sm:mt-10 w-full mx-auto p-4 sm:p-6 md:p-8 lg:p-10 rounded-[2rem] bg-[#0a0a0e]/60 border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-x-[10%] md:inset-x-[20%] lg:inset-x-[25%] top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          
          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden relative z-10 w-full">
            <TestimonialColumn testimonials={firstColumn} duration={15} />
            <TestimonialColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </div>
    </section>
  );
}

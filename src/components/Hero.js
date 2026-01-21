'use client'
import Image from "next/image"
import Login from "./Login"

export const Hero = () => {
  return (
    <>
      <div className=" md:hidden">
        <div className="float">
          <Image
            className="w-30 h-auto mx-auto mt-0"
            src={"/favicon.png"}
            alt="photo"
            width={150}
            height={150}
          />
        </div>

        <div className="flex flex-col w-2/3 mx-auto items-center mt-3 border-b-[1px] border-gray-700 py-5 fade-up delay-1">
          <div className="font-medium text-white">ACE PRESENTS</div>
          <div className="font-bold text-yellow-300 text-5xl glow-text">NEXUS'26</div>
        </div>

        <div className="text-gray-300 text-xl mt-2 text-center fade-up delay-2">
          <code>JANUARY 25, 2026</code>
        </div>

      <Login/>
      
      </div>

      <div className="hidden md:flex flex-col items-center  w-full py-10">
        <div className="float">
          <Image
            quality={100}
            className="w-40 h-auto mx-auto mb-8"
            src={"/favicon.png"}
            alt="photo"
            width={150}
            height={150}
          />
        </div>

        <div className="flex flex-col w-3/4 max-w-5xl items-center border-b-[1px] w-fit mb-5 border-gray-700 pb-3 fade-up delay-1">
          <div className=" text-xl tracking-[0.2em] text-white">ACE PRESENTS</div>
          <div className="font-bold text-yellow-300 text-6xl mt-2 tracking-tighter glow-text">
            NEXUS'26
          </div>
        </div>

        <div className="text-gray-300 text-xl text-center tracking-widest fade-up delay-2">
          <code>JANUARY 25, 2026</code>
        </div>

       <Login/>
      </div>

      <style jsx>{`
        /* ENTRY ANIMATIONS */
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards;
        }

        .fade-scale {
          opacity: 0;
          transform: scale(0.95);
          animation: fadeScale 0.8s ease forwards;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeScale {
          to { opacity: 1; transform: scale(1); }
        }

        /* FLOATING LOGO */
        .float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* GLOW TITLE */
        .glow-text {
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 8px rgba(253, 224, 71, 0.2); }
          50% { text-shadow: 0 0 18px rgba(253, 224, 71, 0.5); }
        }

        /* TAGLINE PILL */
        .glow-pill {
          box-shadow: 0 0 0 rgba(253, 224, 71, 0.4);
          animation: pillGlow 3s ease-in-out infinite;
        }

        @keyframes pillGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(253, 224, 71, 0.2); }
          50% { box-shadow: 0 0 16px rgba(253, 224, 71, 0.5); }
        }

        /* TEXT SHIMMER */
        .shimmer {
          animation: shimmer 4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }

        /* HOVER LIFT */
        .hover-lift {
          transition: transform 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </>
  )
}

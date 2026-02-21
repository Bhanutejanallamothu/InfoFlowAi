"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

interface GooeyNavItem {
  label: string;
  href: string;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        
        const themeColors = [
          'hsl(var(--secondary))',
          'hsl(var(--accent))',
          'hsl(var(--primary))'
        ];
        const selectedColor = themeColors[p.color % themeColors.length];
        particle.style.setProperty('--color', selectedColor);
        
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {}
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (activeIndex === index) return;
    
    const liEl = e.currentTarget.parentElement;
    if (!liEl) return;

    setActiveIndex(index);
    updateEffectPosition(liEl);
    
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current!.removeChild(p));
      makeParticles(filterRef.current);
    }
    
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const itemsList = navRef.current.querySelectorAll('li');
    const activeLi = itemsList[activeIndex] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
      filterRef.current?.classList.add('active');
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    if (initialActiveIndex !== activeIndex) {
      setActiveIndex(initialActiveIndex);
    }
  }, [initialActiveIndex]);

  return (
    <>
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
            font-size: 0.875rem;
            font-weight: 700;
            letter-spacing: -0.01em;
          }
          .effect.text {
            color: transparent;
            transition: color 0.3s ease;
          }
          .effect.text.active {
            color: hsl(var(--secondary-foreground));
          }
          .effect.filter {
            filter: blur(4px) contrast(20);
            mix-blend-mode: normal;
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: hsl(var(--secondary));
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 12px;
            height: 12px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 500ms;
            position: absolute;
            top: calc(50% - 6px);
            left: calc(50% - 6px);
            animation: particle calc(var(--time)) ease 1 -100ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -100ms;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          li.active-pill {
            color: transparent !important;
          }
        `}
      </style>
      <div className="relative" ref={containerRef}>
        <nav className="flex relative items-center h-10">
          <ul
            ref={navRef}
            className="flex gap-4 list-none p-0 m-0 relative z-[3]"
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "rounded-full relative cursor-pointer transition-colors duration-300 text-sm font-semibold",
                  activeIndex === index ? "active-pill" : "text-primary/80 hover:text-primary"
                )}
              >
                <Link
                  href={item.href}
                  onClick={e => handleClick(e as any, index)}
                  className="outline-none py-2 px-5 inline-block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Chat", href: "/chat" },
    { label: "History", href: "/history" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const activeIndex = navLinks.findIndex(link => {
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href);
  });

  return (
    <nav className="border-b bg-white/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/50 sticky top-0 z-50 w-full shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 z-10 hover:opacity-90 transition-all group">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black font-headline text-primary tracking-tighter">InfoFlow AI</span>
        </Link>

        {/* Middle: Navigation Links (Desktop) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
          <GooeyNav 
            items={navLinks} 
            initialActiveIndex={activeIndex === -1 ? 0 : activeIndex}
          />
        </div>

        {/* Right: Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4 z-10">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-semibold text-primary/80 hover:text-primary hover:bg-primary/5 transition-all">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold px-7 shadow-xl shadow-primary/20 transition-all active:scale-95">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          {mounted && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/5 transition-colors">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l-0 shadow-2xl">
                <div className="flex flex-col gap-8 mt-10">
                  <div className="flex flex-col gap-4">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-2 mb-2">Navigation</p>
                    {navLinks.map((link) => (
                      <Link 
                        key={link.href} 
                        href={link.href} 
                        className={cn(
                          "text-lg font-bold px-4 py-3 rounded-xl transition-all",
                          pathname === link.href 
                            ? "text-secondary bg-secondary/10 shadow-sm" 
                            : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3 pt-6 border-t mt-auto mb-10">
                    <Link href="/login" className="w-full">
                      <Button variant="outline" className="w-full rounded-xl border-2 font-bold">Login</Button>
                    </Link>
                    <Link href="/signup" className="w-full">
                      <Button className="w-full bg-primary rounded-xl shadow-lg shadow-primary/20 font-bold">Sign Up</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
}
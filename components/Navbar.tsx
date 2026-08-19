"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onBuildPlan: () => void;
}

export default function Navbar({ onBuildPlan }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Product", href: "#product" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Logo */}
        <a href="#" className="text-lg font-semibold tracking-tight text-zinc-100">
          DevFlow
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors duration-150 hover:text-zinc-100"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button className="text-sm text-zinc-400 transition-colors duration-150 hover:text-zinc-100">
            Sign in
          </button>
          <button
            onClick={onBuildPlan}
            className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors duration-150 hover:bg-white"
          >
            Build a plan
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center rounded-md p-2 text-zinc-400 transition-colors hover:text-zinc-100 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-800/60 bg-zinc-950 px-5 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-zinc-400 transition-colors duration-150 hover:text-zinc-100"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-zinc-800/60" />
            <button className="text-left text-sm text-zinc-400 transition-colors duration-150 hover:text-zinc-100">
              Sign in
            </button>
            <button
              onClick={() => {
                onBuildPlan();
                setMobileOpen(false);
              }}
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors duration-150 hover:bg-white"
            >
              Build a plan
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

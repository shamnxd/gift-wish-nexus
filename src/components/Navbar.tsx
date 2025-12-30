import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gift, PenLine, Heart, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/write-letter', label: 'Write Letter' },
    { to: '/sponsor', label: 'Gifts' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-card/70 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <TreePine className="w-8 h-8 text-primary" />
            <span className="font-display text-xl text-foreground">
              Secret<span className="text-primary">Santa</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === to ? 'text-primary' : 'text-foreground'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/santa-dashboard" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/write-letter">
              <Button variant="christmas" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-md">
        <div className="flex justify-around py-2">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === to
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

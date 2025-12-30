import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Heart, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-santa-dark text-santa-cream/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <TreePine className="w-8 h-8 text-primary" />
              <span className="font-display text-xl text-santa-cream">
                Secret<span className="text-primary">Santa</span>
              </span>
            </Link>
            <p className="text-santa-cream/60 text-sm leading-relaxed">
              Spreading Christmas joy, one letter at a time. Connecting children with Santa and generous sponsors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-santa-cream mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/write-letter" className="text-santa-cream/60 hover:text-primary transition-colors text-sm">
                  Write a Letter
                </Link>
              </li>
              <li>
                <Link to="/sponsor" className="text-santa-cream/60 hover:text-primary transition-colors text-sm">
                  Become a Sponsor
                </Link>
              </li>
              <li>
                <Link to="/santa-dashboard" className="text-santa-cream/60 hover:text-primary transition-colors text-sm">
                  Santa's Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-santa-cream mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-santa-cream/60 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                North Pole, Arctic Circle
              </li>
              <li className="flex items-center gap-2 text-santa-cream/60 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                santa@northpole.christmas
              </li>
            </ul>
          </div>

          {/* Made With Love */}
          <div>
            <h4 className="font-display text-santa-cream mb-4">Spread the Joy</h4>
            <p className="text-santa-cream/60 text-sm mb-4 leading-relaxed">
              Help us make Christmas magical for every child.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Heart className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium">Made with love</span>
            </div>
          </div>
        </div>

        <div className="border-t border-santa-cream/10 mt-12 pt-8 text-center">
          <p className="text-santa-cream/40 text-sm">
            © {new Date().getFullYear()} SecretSanta. All rights reserved. 🎄
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

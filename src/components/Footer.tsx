import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Heart, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-christmas-night text-christmas-snow/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-christmas flex items-center justify-center">
                <Gift className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-christmas-snow">
                Santa's Letters
              </span>
            </Link>
            <p className="text-christmas-snow/60 text-sm">
              Spreading Christmas joy, one letter at a time. Connecting children with Santa and generous sponsors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-christmas-snow mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/write-letter" className="text-christmas-snow/60 hover:text-christmas-gold transition-colors text-sm">
                  Write a Letter
                </Link>
              </li>
              <li>
                <Link to="/sponsor" className="text-christmas-snow/60 hover:text-christmas-gold transition-colors text-sm">
                  Become a Sponsor
                </Link>
              </li>
              <li>
                <Link to="/santa-dashboard" className="text-christmas-snow/60 hover:text-christmas-gold transition-colors text-sm">
                  Santa's Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-christmas-snow mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-christmas-snow/60 text-sm">
                <MapPin className="w-4 h-4" />
                North Pole, Arctic Circle
              </li>
              <li className="flex items-center gap-2 text-christmas-snow/60 text-sm">
                <Mail className="w-4 h-4" />
                santa@northpole.christmas
              </li>
            </ul>
          </div>

          {/* Made With Love */}
          <div>
            <h4 className="font-display font-bold text-christmas-snow mb-4">Spread the Joy</h4>
            <p className="text-christmas-snow/60 text-sm mb-4">
              Help us make Christmas magical for every child.
            </p>
            <div className="flex items-center gap-2 text-christmas-gold">
              <Heart className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium">Made with love</span>
            </div>
          </div>
        </div>

        <div className="border-t border-christmas-snow/10 mt-12 pt-8 text-center">
          <p className="text-christmas-snow/40 text-sm">
            © {new Date().getFullYear()} Santa's Letters. All rights reserved. 🎄
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-gradient">VibeGen</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#gallery">Gallery</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          className="md:hidden glass-strong border-t border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <NavLink href="#features" mobile>Features</NavLink>
            <NavLink href="#gallery" mobile>Gallery</NavLink>
            <NavLink href="#pricing" mobile>Pricing</NavLink>
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <Button variant="ghost" size="sm">Sign In</Button>
              <Button variant="hero" size="sm">Get Started</Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const NavLink = ({ href, children, mobile = false }: { href: string; children: React.ReactNode; mobile?: boolean }) => (
  <motion.a
    href={href}
    className={`text-muted-foreground hover:text-foreground transition-colors ${mobile ? 'text-base' : 'text-sm'}`}
    whileHover={{ x: mobile ? 4 : 0 }}
  >
    {children}
  </motion.a>
);

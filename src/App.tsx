import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, Code, Palette, Share2, Mail, Globe, Cpu, 
  Instagram, Facebook, Twitter, Youtube, Send, 
  ChevronRight, Zap, ArrowRight, Layers,
  Layout, PenTool, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast, Toaster } from 'sonner';

// --- Custom Styles in JS to avoid index.css restrictions ---
const gridStyle = {
  backgroundSize: '50px 50px',
  backgroundImage: 
    'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
};

// --- Shared Components ---

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={gridStyle}>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
  </div>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-zinc-500 max-w-2xl mx-auto text-lg font-light"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="h-1 w-24 bg-cyan-400 mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
    />
  </div>
);

const CyberCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className={`relative group ${className}`}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-10 group-hover:opacity-40 transition duration-500"></div>
    <Card className="relative h-full bg-zinc-900/60 border-white/5 backdrop-blur-xl overflow-hidden rounded-2xl border">
      {children}
    </Card>
  </motion.div>
);

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-lg border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-md flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              <Cpu className="text-black w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase">LURV<span className="text-cyan-400">DROID</span></span>
          </motion.div>
          
          <div className="hidden lg:block">
            <div className="flex items-center space-x-10">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-zinc-400 hover:text-cyan-400 text-xs font-bold tracking-widest uppercase transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <Button 
                className="bg-cyan-400 hover:bg-cyan-300 text-black font-black px-6 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                HIRE ME
              </Button>
            </div>
          </div>
          
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-300 hover:text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-950/95 border-b border-white/5 overflow-hidden backdrop-blur-2xl"
          >
            <div className="px-6 py-10 space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-cyan-400 block text-2xl font-black tracking-tighter uppercase"
                >
                  {item.name}
                </a>
              ))}
              <Button 
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black h-14 text-lg rounded-xl"
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                HIRE ME
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/88e294e6-50cb-4a12-bb92-3aa56b63dd7a/hero-bg-92795c37-1776867211564.webp" 
          alt="Lurvdroid Background" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/30 px-6 py-1.5 rounded-full tracking-widest text-[10px] font-black uppercase animate-pulse">
            FUTURE-READY CREATIVE
          </Badge>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
            LURV<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500">DROID</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-tight font-light tracking-wide">
            A fusion of <span className="text-white font-medium">technology</span>, 
            <span className="text-white font-medium"> creativity</span>, and 
            <span className="text-white font-medium"> expression</span>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="h-16 px-10 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-lg group rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              VIEW WORK
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-16 px-10 border-white/10 hover:bg-white/5 text-white text-lg font-bold rounded-xl transition-all"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              GET IN TOUCH
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-1 h-14 rounded-full bg-gradient-to-b from-cyan-400 to-transparent opacity-50 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        />
      </div>
    </section>
  );
};

const About = () => {
  const skills = ["Web Development", "Mobile Apps", "UI/UX Design", "Digital Marketing", "Tattoo Design", "Pencil Art", "Branding", "Content Strategy"];
  
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle subtitle="Bridging the gap between the digital and the physical.">
              WHO IS <span className="text-cyan-400">LURVDROID</span>?
            </SectionTitle>
            <div className="space-y-8 text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
              <p>
                I am a multi-disciplinary creative professional operating at the intersection of technology and art. 
                Under the brand <span className="text-white font-bold">Lurvdroid</span>, I build digital experiences and create tangible art that pushes boundaries.
              </p>
              <p>
                From architecting scalable <span className="text-cyan-400">web and mobile applications</span> to crafting immersive <span className="text-purple-400">digital marketing strategies</span>, 
                and even etching permanent <span className="text-white">visual art</span> onto skin and paper — my work is defined by versatility and innovation.
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Badge variant="outline" className="border-white/10 bg-zinc-900/50 text-zinc-300 py-2 px-5 text-xs font-bold rounded-lg hover:border-cyan-400 transition-colors uppercase tracking-wider">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-cyan-400/10 blur-3xl rounded-full"></div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative group shadow-2xl">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/88e294e6-50cb-4a12-bb92-3aa56b63dd7a/art-portfolio-1-2d99d0a7-1776867211892.webp" 
                alt="Artist Portrait"
                className="w-full h-full object-cover grayscale brightness-75 transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-8 left-8 right-8 p-8 bg-zinc-950/40 backdrop-blur-2xl rounded-2xl border border-white/10">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-cyan-400/20 rounded-xl text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-white font-black text-2xl uppercase tracking-tighter">Impactful</div>
                    <div className="text-zinc-500 text-xs tracking-widest uppercase font-bold">Creative Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const categories = [
    {
      title: "Digital Marketing",
      icon: <TrendingUp className="w-10 h-10 text-cyan-400" />,
      items: [
        { label: "Social Media Growth", desc: "Strategic expansion of your digital footprint." },
        { label: "Content Strategy", desc: "Data-driven storytelling that resonates." },
        { label: "Branding", desc: "Identity design for the modern era." },
        { label: "Audience Engagement", desc: "Building loyal digital communities." }
      ],
      color: "from-cyan-400/10 to-transparent"
    },
    {
      title: "Tech & Dev",
      icon: <Layout className="w-10 h-10 text-purple-400" />,
      items: [
        { label: "Website Design", desc: "Performant, visually stunning web experiences." },
        { label: "Mobile App Creation", desc: "iOS & Android apps with seamless UX." },
        { label: "UI/UX Design", desc: "Intuitive interfaces for complex systems." },
        { label: "Full-Stack Dev", desc: "Robust backend logic with modern frontends." }
      ],
      color: "from-purple-400/10 to-transparent"
    },
    {
      title: "Creative Services",
      icon: <PenTool className="w-10 h-10 text-white" />,
      items: [
        { label: "Tattoo Design", desc: "Custom geometric and minimalist ink art." },
        { label: "Pencil Artwork", desc: "Highly detailed portraits and concept art." },
        { label: "Custom Portraits", desc: "Hand-drawn captures of character." },
        { label: "Visual Identity", desc: "Complete visual ecosystem for your brand." }
      ],
      color: "from-white/5 to-transparent"
    }
  ];

  return (
    <section id="services" className="py-32 bg-zinc-950/40 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Professional services tailored for the future of digital and physical art.">
          CORE <span className="text-cyan-400">EXPERTISE</span>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((cat, idx) => (
            <CyberCard key={idx} className="h-full">
              <div className={`p-10 bg-gradient-to-br ${cat.color} h-full flex flex-col`}>
                <div className="mb-8 p-4 bg-zinc-950/50 rounded-2xl w-fit border border-white/5 shadow-inner">
                  {cat.icon}
                </div>
                <h3 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase">{cat.title}</h3>
                <ul className="space-y-6 flex-grow">
                  {cat.items.map((item, i) => (
                    <li key={i} className="group/item">
                      <div className="text-zinc-100 font-bold text-lg mb-1 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover/item:scale-150 transition-transform" />
                        {item.label}
                      </div>
                      <div className="text-zinc-500 text-sm leading-relaxed ml-3.5 font-light">
                        {item.desc}
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="link" className="mt-10 p-0 text-cyan-400 hover:text-white group w-fit text-xs font-bold tracking-widest uppercase">
                  LEARN MORE <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CyberCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  
  const projects = [
    { 
      title: "Lurvdroid Mobile App", 
      category: "Tech", 
      img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/88e294e6-50cb-4a12-bb92-3aa56b63dd7a/lurvdroid-mobile-app-ux-1ffe2588-1776867388739.webp",
      desc: "Modern UX/UI design with React Native"
    },
    { 
      title: "Analytics Dashboard", 
      category: "Marketing", 
      img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/88e294e6-50cb-4a12-bb92-3aa56b63dd7a/marketing-analytics-dashboard-754998fa-1776867388620.webp",
      desc: "Neon-themed marketing performance tracker"
    },
    { 
      title: "Cybernetic Portrait", 
      category: "Art", 
      img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/88e294e6-50cb-4a12-bb92-3aa56b63dd7a/cybernetic-pencil-portrait-a5eede77-1776867388849.webp",
      desc: "Detailed pencil sketch with digital enhancements"
    },
    { 
      title: "Geometric Ink", 
      category: "Art", 
      img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/88e294e6-50cb-4a12-bb92-3aa56b63dd7a/futuristic-tattoo-art-13de7a0a-1776867388743.webp",
      desc: "Custom futuristic tattoo design"
    },
    { 
      title: "Neon Growth Hub", 
      category: "Marketing", 
      img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/88e294e6-50cb-4a12-bb92-3aa56b63dd7a/marketing-portfolio-2-17dedde9-1776867211334.webp",
      desc: "SaaS platform marketing strategy"
    },
    { 
      title: "Holo Analytics v2", 
      category: "Tech", 
      img: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/88e294e6-50cb-4a12-bb92-3aa56b63dd7a/tech-portfolio-1-4d44a7db-1776867211036.webp",
      desc: "Next-gen web application architecture"
    },
  ];

  const categories = ['All', 'Tech', 'Marketing', 'Art'];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <SectionTitle subtitle="A curation of my best work across various creative and technical fields.">
              SELECTED <span className="text-cyan-400">WORKS</span>
            </SectionTitle>
          </div>
          <div className="flex flex-wrap gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
            {categories.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase transition-all ${filter === f ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20' : 'text-zinc-500 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filtered.map((proj, idx) => (
              <motion.div
                key={proj.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-xl"
              >
                <img src={proj.img} alt={proj.title} className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all rounded-3xl m-4 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-cyan-400/20 text-cyan-400 border-none text-[8px] tracking-[0.2em] uppercase font-black px-2 py-0.5 rounded-sm">
                      {proj.category}
                    </Badge>
                  </div>
                  <h3 className="text-white text-2xl font-black tracking-tighter mb-2 uppercase">{proj.title}</h3>
                  <p className="text-zinc-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-light">
                    {proj.desc}
                  </p>
                  <div className="mt-6 flex items-center text-cyan-400 font-black text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 duration-500">
                    VIEW PROJECT <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("TRANSMISSION RECEIVED", {
        description: "Lurvdroid will establish contact shortly.",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const socials = [
    { icon: <Instagram size={20} />, href: "#", name: "Instagram" },
    { icon: <Facebook size={20} />, href: "#", name: "Facebook" },
    { icon: <Twitter size={20} />, href: "#", name: "X" },
    { icon: <Youtube size={20} />, href: "#", name: "YouTube" },
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <SectionTitle subtitle="Ready to start your next project or just want to say hi?">
              GET IN <span className="text-cyan-400">TOUCH</span>
            </SectionTitle>
            
            <div className="space-y-10 mt-12">
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em] mb-1">Direct Communication</div>
                  <div className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tighter">lurvdroid@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em] mb-1">Current Coordinates</div>
                  <div className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors uppercase tracking-tighter">The Digital Frontier</div>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <div className="text-zinc-500 font-black text-[10px] tracking-[0.3em] mb-8 uppercase">SIGNAL CHANNELS</div>
              <div className="flex flex-wrap gap-4">
                {socials.map((social, i) => (
                  <motion.a 
                    key={i} 
                    href={social.href} 
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400 transition-all"
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <CyberCard className="p-1">
              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Name</label>
                    <Input 
                      placeholder="IDENT NAME" 
                      className="h-14 bg-black/40 border-white/5 text-white placeholder:text-zinc-700 focus:border-cyan-400 transition-all rounded-xl text-lg uppercase tracking-tight" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Email</label>
                    <Input 
                      type="email" 
                      placeholder="COMM@NODE.EXT" 
                      className="h-14 bg-black/40 border-white/5 text-white placeholder:text-zinc-700 focus:border-cyan-400 transition-all rounded-xl text-lg uppercase tracking-tight" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Message</label>
                  <Textarea 
                    placeholder="BRIEF DESCRIPTION OF THE OBJECTIVE..." 
                    className="min-h-[180px] bg-black/40 border-white/5 text-white placeholder:text-zinc-700 focus:border-cyan-400 transition-all rounded-xl text-lg resize-none uppercase tracking-tight" 
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black text-xl group rounded-xl hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? "ENCRYPTING..." : "SEND TRANSMISSION"}
                  {!isSubmitting && <Send className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </Button>
              </form>
            </CyberCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 mb-10 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            <Cpu className="text-black w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-white tracking-tighter uppercase">LURV<span className="text-cyan-400">DROID</span></span>
        </motion.div>
        
        <div className="text-zinc-500 text-[10px] tracking-[0.3em] mb-10 font-bold uppercase">
          &copy; {new Date().getFullYear()} LURVDROID. ALL SYSTEMS OPERATIONAL. <br className="md:hidden" />
          DESIGNED FOR THE FUTURE.
        </div>
        
        <div className="flex gap-10">
          <a href="#" className="text-zinc-600 hover:text-cyan-400 text-[10px] font-black tracking-[0.2em] transition-colors uppercase">Privacy Protocol</a>
          <a href="#" className="text-zinc-600 hover:text-purple-400 text-[10px] font-black tracking-[0.2em] transition-colors uppercase">Terms of Service</a>
        </div>
        
        <div className="mt-16 flex items-center gap-2 text-zinc-800 text-[8px] tracking-[0.3em] font-black uppercase">
          <Layers size={10} /> BUILT WITH PRECISION BY LURVDROID
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-400 selection:text-black font-sans scroll-smooth overflow-x-hidden">
      <Toaster position="bottom-right" theme="dark" closeButton />
      <BackgroundGrid />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
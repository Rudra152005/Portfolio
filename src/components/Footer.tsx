const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-sm font-bold text-foreground">▲ Rudra</span>
        <p className="text-xs text-muted-foreground">
          © 2026 Rudra. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["About", "Projects", "Articles", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

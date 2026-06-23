import type { Profile } from '../types';

interface FooterProps {
  profile: Profile;
}

const Footer = ({ profile }: FooterProps) => (
  <footer className="py-12 px-6 border-t border-white/10 bg-[#030314]">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <p className="text-xs font-mono text-white tracking-widest">
        © {new Date().getFullYear()} {profile.name}
      </p>

      <nav className="flex items-center gap-8">
        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono tracking-[0.2em] text-white hover:text-[#4dd9ff] uppercase transition-colors duration-300"
          >
            GitHub
          </a>
        )}
        {profile.linkedIn && (
          <a
            href={profile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono tracking-[0.2em] text-white hover:text-[#4dd9ff] uppercase transition-colors duration-300"
          >
            LinkedIn
          </a>
        )}
        {profile.twitter && (
          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono tracking-[0.2em] text-white hover:text-[#4dd9ff] uppercase transition-colors duration-300"
          >
            Twitter
          </a>
        )}
        {profile.blog && (
          <a
            href={profile.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono tracking-[0.2em] text-white hover:text-[#4dd9ff] uppercase transition-colors duration-300"
          >
            Blog
          </a>
        )}
      </nav>
    </div>
  </footer>
);

export default Footer;

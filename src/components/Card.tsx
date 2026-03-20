import type { Project } from '../types';

interface CardProps {
  project: Project;
  featured?: boolean;
}

const Card = ({ project, featured = false }: CardProps) => (
  <article className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/25 transition-all duration-500">
    <div className={`relative overflow-hidden ${featured ? 'aspect-video' : 'aspect-4/3'}`}>
      {project.imageLink ? (
        <img
          src={project.imageLink}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-linear-to-br from-[#a78bfa]/20 via-[#030314] to-[#4dd9ff]/20" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-[#030314] via-[#030314]/40 to-transparent" />
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#4dd9ff] transition-colors duration-300">
        {project.name}
      </h3>

      <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>
      {project.tags?.list && project.tags.list.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.list.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-[#a78bfa]/10 border border-[#a78bfa]/20 text-[#a78bfa]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-4">
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono tracking-wide text-[#4dd9ff] hover:text-white transition-colors duration-200"
          >
            Live →
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono tracking-wide text-slate-400 hover:text-white transition-colors duration-200"
          >
            GitHub →
          </a>
        )}
      </div>
    </div>
  </article>
);

export default Card;

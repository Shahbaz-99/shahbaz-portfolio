import type { NavLink } from "@/types";

export default function Navbar({ name, links }: { name: string; links: NavLink[] }) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#home" className="brand"><span className="logo">{name[0]}</span>{name}</a>
        <nav>{links.map((l) => <a key={l.id} href={`#${l.id}`}>{l.label}</a>)}</nav>
      </div>
    </header>
  );
}

import { Link } from "react-router-dom";

interface BreadcrumbLink {
  href: string;
  content: string;
  active?: boolean;
}

interface BreadcrumbProps {
  links: BreadcrumbLink[];
}

export function Breadcrumb({ links }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="パンくずリスト">
      <ul>
        {links.map(({ href, content, active }, i) => (
          <li key={i} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>
            <Link to={href}>{content}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

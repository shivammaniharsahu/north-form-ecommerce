import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><div><p className="eyebrow">Page not found</p><h1>404</h1><p>This object seems to have wandered out of the edit.</p><Link className="button button-dark" href="/">Return home</Link></div></main>;
}

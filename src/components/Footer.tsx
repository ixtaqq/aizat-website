import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <span>{profile.name}</span>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
      <a href={profile.phoneHref}>{profile.phone}</a>
      <a href="#about">Back to top ↑</a>
    </footer>
  );
}

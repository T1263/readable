import css from './Footer.module.css';
export default function Footer() {
  const year = new Date().getFullYear();
  return <p className={css.footer}>Copy Logo {year}</p>;
}

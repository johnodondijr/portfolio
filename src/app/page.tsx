import { HeroPortrait } from "@/components/HeroPortrait";
import { Icon } from "@/components/Icon";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { OptionalImage } from "@/components/OptionalImage";
import { ScrollEffects } from "@/components/ScrollEffects";
import { SplitWords } from "@/components/SplitWords";
import { Testimonials } from "@/components/Testimonials";
import { AppIcon, hasAppIcon } from "@/components/AppIcon";
import { ToolIcon } from "@/components/ToolIcon";
import { WorkGrid } from "@/components/WorkGrid";
import { contact, extras, faqs, process, services, stats, tools } from "@/content";
import { getProjects, getTestimonials } from "@/lib/data";

// Re-fetch projects and testimonials from Supabase at most once a minute.
export const revalidate = 60;

export default async function Home() {
  const [projects, testimonials] = await Promise.all([getProjects(), getTestimonials()]);

  return (
    <>
      <div className="bg-mesh" aria-hidden="true" />
      <Nav />
      <ScrollEffects />

      <header className="hero" id="home">
        <h1 className="hero__name" aria-label="Johnfred, graphic designer">
          <span aria-hidden="true">
            {[..."JOHNFRED"].map((letter, i) => (
              <span key={i} className="hero__letter" style={{ ["--i" as string]: i }}>
                {letter}
              </span>
            ))}
          </span>{" "}
          <span className="hero__role" aria-hidden="true">
            GRAPHIC DESIGNER
          </span>
        </h1>
        <HeroPortrait />
        <p className="hero__intro hero__intro--left">
          Hi, I&apos;m Johnfred, a graphic designer creating bold visuals that get brands noticed.
        </p>
        <p className="hero__intro hero__intro--right">
          Social media graphics, brand identity and UI design, crafted with purpose and made to stand out.
        </p>
        <span className="hero__meta hero__meta--left">
          <span className="status-dot" aria-hidden="true" />
          Available for new projects
        </span>
        <a href="#work" className="hero__meta hero__meta--right">
          See my work
          <span className="hero__arrow" aria-hidden="true">
            ↓
          </span>
        </a>
      </header>

      <section className="about section" id="about">
        <div className="about__text">
          <span className="eyebrow">(About Me)</span>
          <h2 className="h2">Good design gets seen. Great design gets remembered.</h2>
          <div className="about__stats">
            {stats.map((s) => (
              <div key={s.label}>
                <strong data-count={s.value}>0</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about__media">
          <div className="about__photo">
            <OptionalImage
              src="/images/about.webp"
              alt="Portrait of Johnfred"
              fallback={<span className="placeholder-label">public/images/about.webp</span>}
            />
          </div>
          <p>
            I&apos;m Johnfred, a graphic designer who believes every brand deserves visuals that speak for it. I work
            with colour, typography and layout to turn ideas into designs that communicate clearly and look great
            doing it.
          </p>
          <p>
            Most of my work is for social media, where a design has a split second to grab attention. I also create
            brand identities that give businesses a confident, consistent look, and UI designs that make websites and
            apps simple and enjoyable to use.
          </p>
          <p>
            I&apos;m also very tech savvy. I use AI tools like ChatGPT, Gemini and Claude to create striking imagery,
            sharpen copy and explore ideas faster. Beyond design, I&apos;ve built software tools and SaaS products that
            help teams save time, stay organised and manage their work better.
          </p>
          <p>
            Whether it&apos;s a single poster or a full brand, I bring the same attention to detail and the same goal:
            design that helps you stand out.
          </p>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="services__head">
          <div>
            <span className="eyebrow eyebrow--caps">What I Do</span>
            <h2 className="h2">
              Design Services That
              <br />
              Make Brands Shine
            </h2>
          </div>
          <p className="muted">
            I create visuals that fit your brand, speak to your audience and look sharp on every screen, feed and
            print.
          </p>
        </div>

        <div className="services__grid">
          {services.map((s) => (
            <article key={s.title} className="service-card">
              <span className="service-card__icon">
                <Icon name={s.icon} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="services__extra">
          <p>
            <strong>Plus, a tech edge.</strong> I bring AI and software skills to every project.
          </p>
          <ul>
            {extras.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </section>

      <Marquee label="Tools I use">
          {[0, 1].flatMap((copy) =>
            tools.map((t) => (
              <span key={`${copy}-${t}`} className="marquee__item" aria-hidden={copy === 1}>
                <span className="tool">
                  {hasAppIcon(t) ? <AppIcon name={t} /> : <ToolIcon name={t} />}
                  <span className="tool__name">{t}</span>
                </span>
                <i>✦</i>
              </span>
            )),
          )}
      </Marquee>

      <section className="work" id="work">
        <div className="work__inner">
          <h2 className="work__title">
            <SplitWords lines={["Selected Work"]} />
          </h2>
          <WorkGrid projects={projects} />
        </div>
      </section>

      <section className="process section">
        <span className="eyebrow eyebrow--caps">My Process</span>
        <h2 className="h2">
          <SplitWords lines={["From Idea to Final Design"]} />
        </h2>
        <ol className="process__list">
          {process.map((step, i) => (
            <li key={step.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {testimonials.length > 0 && <Testimonials items={testimonials} />}

      <section className="faq section">
        <div>
          <h2 className="h3">Frequently Asked Questions</h2>
          <p className="muted small">Quick answers to the questions I get asked most.</p>
        </div>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <span className="eyebrow eyebrow--caps">Have a project in mind?</span>
        <h2 className="contact__title">
          <SplitWords lines={["Let's make your brand", "stand out."]} emphasizeLast />
        </h2>
        <a href={`mailto:${contact.email}?subject=New%20Project`} className="btn">
          Start a Project <span>→</span>
        </a>
        <div className="contact__links">
          <a href={contact.phoneHref} className="contact__link">
            <Icon name="phone" />
            {contact.phone}
          </a>
          <a href={contact.whatsapp} className="contact__link" target="_blank" rel="noopener">
            <Icon name="whatsapp" />
            WhatsApp
          </a>
          <a href={`mailto:${contact.email}`} className="contact__link">
            <Icon name="mail" />
            {contact.email}
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Johnfred. All rights reserved.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}

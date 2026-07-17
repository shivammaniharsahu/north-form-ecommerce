import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { featuredProducts } from "@/data/products";

export default function HomePage() {
  return (
    <main>
      <section className="hero container-wide">
        <div className="hero-copy">
          <p className="eyebrow">New ritual · Autumn 2026</p>
          <h1>
            Objects for a
            <br />
            <em>well-lived</em> day.
          </h1>
          <p className="hero-description">
            Quietly expressive essentials, selected for their form, function,
            and ability to make the everyday feel considered.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/shop">
              Shop the edit <ArrowRight size={17} />
            </Link>
            <Link className="text-link" href="/collections/new-arrivals">
              Explore new arrivals <MoveRight size={17} />
            </Link>
          </div>
          <div className="hero-proof" aria-label="Store benefits">
            <span>4.9 / 5 community rating</span>
            <span>Free delivery over ₹3,500</span>
          </div>
        </div>

        <div className="hero-media">
          <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=88"
            alt="Curated neutral wardrobe in a sunlit studio"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
          />
          <div className="hero-card">
            <span>Editor&apos;s note</span>
            <p>Less, but better. Pieces that earn their place.</p>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <Sparkles size={16} />
            <span>CURATED WITH INTENTION · MADE FOR EVERY DAY ·</span>
          </div>
        </div>
      </section>

      <section className="marquee" aria-label="Store values">
        <div>
          <span>Considered design</span>
          <i>✦</i>
          <span>Natural materials</span>
          <i>✦</i>
          <span>Small-batch makers</span>
          <i>✦</i>
          <span>Timeless utility</span>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">The current edit</p>
            <h2>Made to stay in rotation.</h2>
          </div>
          <Link className="text-link" href="/shop">
            View all products <ArrowRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="editorial-grid container-wide">
        <article className="editorial-image editorial-image-main">
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=88"
            alt="Soft green lounge chair in a considered interior"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <div className="image-label">The living edit</div>
        </article>
        <div className="editorial-story">
          <p className="eyebrow">Journal 03</p>
          <h2>Room to breathe.</h2>
          <p>
            A home does not need more things. It needs the right things—useful,
            tactile, and quietly beautiful.
          </p>
          <Link className="button button-outline" href="/collections/living">
            Explore living <ArrowRight size={17} />
          </Link>
          <div className="editorial-thumb">
            <Image
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=85"
              alt="Minimal creative studio with warm natural light"
              fill
              sizes="(max-width: 800px) 100vw, 32vw"
            />
          </div>
        </div>
      </section>

      <section className="manifesto section container">
        <p className="eyebrow">Our point of view</p>
        <p className="manifesto-copy">
          We look for the sweet spot between <em>useful</em> and beautiful—then
          choose pieces we would happily live with for years.
        </p>
        <div className="manifesto-stats">
          <div><strong>42</strong><span>independent makers</span></div>
          <div><strong>91%</strong><span>lower-plastic packaging</span></div>
          <div><strong>30</strong><span>day easy returns</span></div>
        </div>
      </section>

      <section className="category-section section container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Shop by mood</p>
            <h2>Find your next favourite.</h2>
          </div>
        </div>
        <div className="category-grid">
          <Link href="/collections/everyday-carry" className="category-card category-card-tall">
            <Image src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1100&q=86" alt="Leather everyday carry bag" fill sizes="(max-width: 700px) 100vw, 40vw" />
            <span><small>01</small> Everyday carry <ArrowRight size={18} /></span>
          </Link>
          <Link href="/collections/wear" className="category-card">
            <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1100&q=86" alt="Modern red sneaker" fill sizes="(max-width: 700px) 100vw, 28vw" />
            <span><small>02</small> Wear <ArrowRight size={18} /></span>
          </Link>
          <Link href="/collections/living" className="category-card">
            <Image src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1100&q=86" alt="Warm neutral living room" fill sizes="(max-width: 700px) 100vw, 28vw" />
            <span><small>03</small> Living <ArrowRight size={18} /></span>
          </Link>
        </div>
      </section>

      <section className="newsletter container-wide">
        <div>
          <p className="eyebrow">A considered inbox</p>
          <h2>New objects. Useful stories. No clutter.</h2>
        </div>
        <form className="newsletter-form">
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" type="email" placeholder="you@example.com" required />
          <button type="submit" aria-label="Subscribe"><ArrowRight /></button>
        </form>
      </section>
    </main>
  );
}

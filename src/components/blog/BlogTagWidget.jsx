import Link from "next/link";
import React from "react";

function BlogTagWidget() {
  return (
    <div className="single-widgets widget_egns_tag mb-30">
      <div className="widget-title">
      <center><h3>Les sujets du forum de communication </h3></center>  
      </div>
      <p className="wp-block-tag-cloud">
        <Link legacyBehavior href="/blog-grid">
          <a>#Maladie & Blessure</a>
        </Link>
        <Link legacyBehavior href="/blog-grid">
          <a>#Alimentation</a>
        </Link>
        <Link legacyBehavior href="/blog-grid">
          <a>#Dressage</a>
        </Link>
        <Link legacyBehavior href="/blog-grid">
          <a>#Sauvetage</a>
        </Link>
        <Link legacyBehavior href="/blog-grid">
          <a>#Comportement</a>
        </Link>
        <Link legacyBehavior href="/blog-grid">
          <a>#Amusement</a>
        </Link>
        <Link legacyBehavior href="/blog-grid">
          <a>#Autres ...</a>
        </Link>
      </p>
    </div>
  );
}

export default BlogTagWidget;

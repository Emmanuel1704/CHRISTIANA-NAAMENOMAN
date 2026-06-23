import React from 'react';
import { Head } from '@inertiajs/react';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export default function SEO({ 
    title = "Chrisnoman Fashion | Luxury Ladies' Wear & Custom Tailoring", 
    description = "Discover elegance at Chrisnoman Fashion. Bespoke bridal wear, contemporary African prints, and professional tailoring in Lagos, Nigeria.", 
    image = "/assets/images/hero.png",
    url = "https://chrisnoman.com",
    type = "website"
}: SEOProps) {
    const siteTitle = title.includes('Chrisnoman') ? title : `${title} | Chrisnoman Fashion`;

    return (
        <Head>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={url} />
        </Head>
    );
}

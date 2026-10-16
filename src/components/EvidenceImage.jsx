import { imageDimensions } from '../data/imageDimensions.js';

export default function EvidenceImage({ src, alt, caption, width, height, loading = 'lazy' }) {
  const size = imageDimensions[src] || [];
  return (
    <figure className="screenshot-frame">
      <a className="evidence-image-link" href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${alt}`}>
        <img src={src} alt={alt} width={width || size[0]} height={height || size[1]} loading={loading} />
      </a>
      <figcaption>{caption} <a href={src} target="_blank" rel="noreferrer">Open full-size image</a></figcaption>
    </figure>
  );
}

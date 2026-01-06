import { useInView } from "react-intersection-observer";

export default function LazyImage({ src, alt, className }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  return (
    <img
      ref={ref}
      src={inView ? src : ""}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

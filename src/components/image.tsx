type ImageProps = React.HtmlHTMLAttributes<HTMLImageElement>;

export default function Image({ src, alt, ...props }: ImageProps) {
    return <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
    />
}
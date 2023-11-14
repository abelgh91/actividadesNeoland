import "./Image";

export const Image = ({src, alt, width, height}) => {
  return (
    <figure><img src={src} alt={alt} width={width} height={height} /></figure>
  )
}
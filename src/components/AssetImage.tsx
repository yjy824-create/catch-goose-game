import { useState } from 'react';

type AssetImageProps = {
  src?: string;
  alt: string;
  fallback: string;
  className?: string;
};

const AssetImage = ({ src, alt, fallback, className }: AssetImageProps) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <span className={className}>{fallback}</span>;
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
};

export default AssetImage;


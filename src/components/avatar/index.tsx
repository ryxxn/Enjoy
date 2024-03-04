import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string | undefined | null;
  alt?: string;
  size: number;
}

const Avatar = ({ src, alt, size, ...other }: Props) => {
  const imgSrc = src || `${process.env.PUBLIC_URL}/assets/blank-profile.png`;

  return (
    <img
      src={imgSrc}
      alt={alt}
      style={{ width: size, height: size, borderRadius: '50%' }}
      {...other}
    />
  );
};

export default Avatar;

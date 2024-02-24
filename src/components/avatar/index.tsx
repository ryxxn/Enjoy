import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  alt?: string;
  size: number;
}

const Avatar = ({ src, alt, size, ...other }: Props) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: size, height: size, borderRadius: '50%' }}
      {...other}
    />
  );
};

export default Avatar;

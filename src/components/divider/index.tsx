import './style.scss';

const Divider = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return <div className={`divider ${props.className || ''}`} {...props} />;
};

export default Divider;

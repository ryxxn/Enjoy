import React from 'react';
import './style.scss';
import { BadgeStatusType } from './types';

interface Props {
  label: string;
  status: BadgeStatusType;
}

const Badge = ({ label, status }: Props) => {
  return (
    <div className='badge' data-status={status}>
      {label}
    </div>
  );
};

export default Badge;

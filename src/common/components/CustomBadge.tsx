"use client";

import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';

type CustomBadgeProps = {
  badgeContent: number;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
};

export default function CustomBadge({ badgeContent, color }: CustomBadgeProps) {
  const [ counter, setCounter ] = useState<number>(badgeContent);
  return (
    <Badge badgeContent={counter} color={color}>
      <MailIcon color="primary" onClick={() => setCounter(counter + 1)} />
    </Badge>
  );
}

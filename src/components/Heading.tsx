'use client';

import React from 'react';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading = (props: HeadingProps) => {
  return (
    <div className={props.center ? 'text-center' : 'text-start'}>
      <div className='text-3xl font-bold'>{props.title}</div>
      <div className='font-normal text-neutral-600 mt-2'>{props.subtitle}</div>
    </div>
  );
};

export default Heading;

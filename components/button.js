import React from "react";
import Link from 'next/link'


export const Button = ({action, buttonText}) => {
  return (
    <div>
      <Link href={`/${action}`}>
        <button>{buttonText}</button>
      </Link>
    </div>
  );
};

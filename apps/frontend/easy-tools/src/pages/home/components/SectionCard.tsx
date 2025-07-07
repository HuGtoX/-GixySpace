import React from "react";

type SectionCardProps = {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
};

function SectionCard({ title, right, children }: SectionCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}

export default SectionCard;

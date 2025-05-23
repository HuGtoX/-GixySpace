import React from 'react';

type NavProps = {
  links: Array<{ text: string; href: string }>;
};

const Nav: React.FC<NavProps> = ({ links }) => {
  return (
    <nav className="bg-darkGray sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-['Pacifico'] text-2xl text-lightGray">CodeLog</div>
        <div className="hidden md:flex space-x-8">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="nav-link text-lightGray hover:text-primary"
            >
              {link.text}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <i className="fas fa-bars text-lightGray text-xl cursor-pointer"></i>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
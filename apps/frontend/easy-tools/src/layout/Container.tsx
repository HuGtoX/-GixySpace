interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div
      className="min-h-full font-inter pb-[50px]  bg-gray-50 text-gray-800 
    dark:bg-gray-900 dark:text-gray-100 theme-transition"
    >
      {children}
    </div>
  );
}

export default Container;

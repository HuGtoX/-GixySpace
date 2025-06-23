interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 mb-6">
      <div className="p-4 border-b border-solid border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
        <button
          title="chevron-down"
          id="toggle-instructions"
          className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary/80 transition-colors"
        >
          <i className="fa fa-chevron-down"></i>
        </button>
      </div>
      <div id="instructions-content" className="p-4">
        {children}
      </div>
    </div>
  );
}

export default Card;

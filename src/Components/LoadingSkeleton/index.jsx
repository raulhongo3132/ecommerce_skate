import './style.css';

const LoadingSkeleton = () => {
  return (
    <div className="grid gap-4 md:grip-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div
          key={item}
          className="animate-loading bg-gray-300 w-44 h-56 sm:w-56 sm:h-64 rounded-lg mb-6 shadow-lg"
        ></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

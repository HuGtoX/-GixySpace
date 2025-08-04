export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 transition-colors duration-200 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 transition-colors duration-200 dark:text-gray-100">
            番茄工具箱
          </h1>
          <p className="text-gray-600 transition-colors duration-200 dark:text-gray-400">
            您的专属工具集合
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

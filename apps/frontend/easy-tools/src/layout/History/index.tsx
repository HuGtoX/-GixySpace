import Card from "@/components/Card";

function History() {
  return (
    <Card title="历史记录">
      <ul className="space-y-3">
        <li className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-3">
              <i className="fa fa-qrcode text-primary"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white truncate max-w-[120px]">
                https://www.example.com
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                今天 10:30
              </p>
            </div>
          </div>
          <button className="p-1.5 text-gray-500 hover:text-primary transition-colors">
            <i className="fa fa-copy"></i>
          </button>
        </li>
        <li className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-3">
              <i className="fa fa-qrcode text-primary"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white truncate max-w-[120px]">
                微信：example
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                昨天 16:45
              </p>
            </div>
          </div>
          <button className="p-1.5 text-gray-500 hover:text-primary transition-colors">
            <i className="fa fa-copy"></i>
          </button>
        </li>
        <li className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded bg-primary/10 dark:bg-primary/20 flex items-center justify-center mr-3">
              <i className="fa fa-qrcode text-primary"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white truncate max-w-[120px]">
                tel:+123456789
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                2023-06-22 09:15
              </p>
            </div>
          </div>
          <button className="p-1.5 text-gray-500 hover:text-primary transition-colors">
            <i className="fa fa-copy"></i>
          </button>
        </li>
      </ul>
    </Card>
  );
}
export default History;

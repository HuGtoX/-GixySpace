import React from 'react';
import { Button } from 'antd';

type PaginationProps = {
  currentPage?: number;  // 当前页码（默认1）
  totalPages?: number;   // 总页数（默认3）
};

const Pagination: React.FC<PaginationProps> = ({ currentPage = 1, totalPages = 3 }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex space-x-2">
        {/* 生成页码按钮 */}
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <Button
            key={page}
            type={page === currentPage ? 'primary' : undefined}
            className={`rounded-button whitespace-nowrap ${
              page === currentPage ? '' : 'bg-darkGray text-lightGray hover:bg-primary hover:text-white'
            }`}
          >
            {page}
          </Button>
        ))}

        {/* 下一页按钮 */}
        <Button className="bg-darkGray text-lightGray rounded-button whitespace-nowrap hover:bg-primary hover:text-white">
          下一页 →
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
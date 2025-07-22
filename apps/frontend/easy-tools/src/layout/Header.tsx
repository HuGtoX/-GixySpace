import { Affix, Input, Button, Dropdown, Avatar, MenuProps } from "antd";
import {
  FaSun,
  FaMoon,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const userMenu: MenuProps["items"] = [
  {
    key: "1",
    icon: <FaUser className="mr-2" />,
    label: "个人资料",
  },
  {
    key: "2",
    icon: <FaCog className="mr-2" />,
    label: "设置",
  },
  {
    key: "3",
    icon: <FaSignOutAlt className="mr-2" />,
    label: "退出登录",
  },
];

// 顶部导航栏组件
const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <Affix>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img title="tomato logo" src="/tomato.svg" />
              </div>
              <div className="text-2xl font-bold text-primary dark:text-dark-primary">
                番茄工具
              </div>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
              <Search className="w-full" placeholder="搜索工具或资讯..." />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Button
              shape="circle"
              icon={
                isDarkMode ? (
                  <FaMoon className="text-blue-300" />
                ) : (
                  <FaSun className="text-yellow-500" />
                )
              }
              onClick={toggleTheme}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            />
            <Button shape="circle" icon={<FaBell />} className="relative">
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Avatar
                size={38}
                src="/avatar/a5.png"
                className="border-1 border-solid border-orange-500 dark:border-dark-primary"
              />
            </Dropdown>
          </div>
        </div>
      </header>
    </Affix>
  );
};

export default Header;

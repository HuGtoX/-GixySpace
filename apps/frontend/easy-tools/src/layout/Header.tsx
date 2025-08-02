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
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <div
              className="flex cursor-pointer items-center space-x-3"
              onClick={() => navigate("/")}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                <img title="tomato logo" src="/tomato.svg" />
              </div>
              <div className="text-2xl font-bold text-primary dark:text-dark-primary">
                番茄工具
              </div>
            </div>

            <div className="mx-8 hidden max-w-xl flex-1 items-center md:flex">
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
              className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            />
            <Button shape="circle" icon={<FaBell />} className="relative">
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
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

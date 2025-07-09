import FaIcon from "@/components/FaIcon";
import SectionCard from "./SectionCard";
import { colorClasses } from "../../../../config/theme";

const links = [
  {
    icon: (
      <FaIcon icon="FaGithub" className="text-blue-600 dark:text-blue-400" />
    ),
    color: "blue",
    text: "GitHub",
  },
  {
    icon: (
      <FaIcon icon="FaYoutube" className="text-red-600 dark:text-red-400" />
    ),
    color: "red",
    text: "YouTube",
  },
  {
    icon: (
      <FaIcon icon="FaSpotify" className="text-green-600 dark:text-green-400" />
    ),
    color: "green",
    text: "Spotify",
  },
  {
    icon: (
      <FaIcon
        icon="FaDribbble"
        className="text-purple-600 dark:text-purple-400"
      />
    ),
    color: "purple",
    text: "Dribbble",
  },
];

type LinkItemProps = {
  href: string;
  icon: React.ReactNode;
  color: string;
  text: string;
};

function LinkItem({ href, icon, color, text }: LinkItemProps) {
  return (
    <a
      href={href}
      className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
    >
      <div
        className={`w-8 h-8 rounded ${colorClasses[color]} flex items-center justify-center mr-3`}
      >
        {icon}
      </div>
      <span>{text}</span>
    </a>
  );
}
function QickLink() {
  return (
    <SectionCard title="快捷访问">
      <div className="space-y-3">
        {links.map(({ icon, color, text }) => (
          <LinkItem key={text} href="#" icon={icon} color={color} text={text} />
        ))}
      </div>
      <button className="w-full mt-3 text-sm text-primary dark:text-dark-primary hover:underline">
        管理快捷访问
      </button>
    </SectionCard>
  );
}

export default QickLink;

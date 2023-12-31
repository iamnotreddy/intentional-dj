import { DeviceIcon, QueueIcon } from "./icons";

export const NavBar = (props: {
  handleNavStateChange: (target: string) => void;
}) => {
  const { handleNavStateChange } = props;
  const navButtonStyle = "hover:text-pink-200 hover:scale-125";

  const icons = [
    {
      icon: <QueueIcon />,
      target: "showQueue",
    },
    {
      icon: <DeviceIcon />,
      target: "showDevices",
    },
  ];

  return (
    <div className="flex flex-row space-x-8">
      {icons.map((icon, index) => {
        return (
          <button
            className={navButtonStyle}
            key={index}
            onClick={() => handleNavStateChange(icon.target)}
          >
            {icon.icon}
          </button>
        );
      })}
    </div>
  );
};

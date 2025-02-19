// Header.tsx
import { ConnectKitButton } from "connectkit";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/"); // 跳转到主页
  };

  const handleNavigateDapp = () => {
    navigate("/dapp");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Left: Logo */}
      <div className="text-2xl font-semibold cursor-pointer" onClick={handleNavigateHome}>
        MyLogo
      </div>

      {/* Center: Navigation Menu */}
      <nav className="flex space-x-8">
        <button onClick={handleNavigateHome} className="text-lg hover:text-gray-400 transition">
          Home
        </button>
        <button onClick={handleNavigateDapp} className="text-lg hover:text-gray-400 transition">
          dapp
        </button>
      </nav>

      {/* Right: Wallet Connection */}
      <div>
        <ConnectKitButton />
      </div>
    </header>
  );
};

export default Header;

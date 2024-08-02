import Container from "../Container";
import Links from "./link";
import Logo from "./Logo";
import MenuOptions from "./MenuOptions";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className="p-5 px-20 border-b fixed w-full bg-white z-10 shadow-sm">
      <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
        <ul className="flex gap-3">
          <Links
            label="favorites"
            path="/favorites"
            currentUser={currentUser}
          />
          <Links label="orders" path="/orders" currentUser={currentUser} />
          <Links label="trancking" path="/tracking" currentUser={currentUser} />
          <Links label="wishlist" path="/wishlist" currentUser={currentUser} />
        </ul>

        <Logo bigLogo />

        <MenuOptions currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Navbar;

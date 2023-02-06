import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navigation">
      <div className="nav-links">
        <Link className="logo" to="/">LINKR</Link>
        <Link className="nav-link" to="/demo">demo/</Link>
        <Link className="nav-link" to="/about">about/</Link>
      </div>
      <WalletMultiButton />
    </nav>
  );
};

export default Nav;

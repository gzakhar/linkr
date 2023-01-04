import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Nav = () => {
  return (
    <div className="navigation">
      <text className="logo">LINKR</text>
      <WalletMultiButton />
    </div>
  );
};

export default Nav;

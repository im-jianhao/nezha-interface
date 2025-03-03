import { useAccount } from "wagmi";
import { ContractInteraction } from "@components/ContractInteraction";

// Make sure that this component is wrapped with ConnectKitProvider
const DappTest = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <div>
      <div>Connected Wallet: {address}</div>
      <ContractInteraction />
    </div>
  );
};

export default DappTest;

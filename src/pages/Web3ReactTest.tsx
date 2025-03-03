import InfoContractInterface from '@/components/InfoContractInterface';
import MetaMaskCard from '@components/connectorCards/MetaMaskCard';

const Web3ReactTest = () => {
  return (
    <div>
      <MetaMaskCard />
      <br />
      <InfoContractInterface />
    </div>
  );
};

export default Web3ReactTest;

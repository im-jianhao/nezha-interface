import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { hooks } from '@connections/metaMask';
import NezhaInterestABI from '@abis/NezhaInterest.json';
import type { NezhaInterest } from '@/types/ethers-contracts/NezhaInterest';
import { NezhaInterest__factory, YidengCoin__factory } from '@/types/ethers-contracts';

const CONTRACT_ADDRESS = NezhaInterestABI.networks['11155111'].address;
const ERC20_ADDRESS = '0x1491587f2b57d5cc0fd2162ab05f943c3b98e77f';

const InfoContractInterface = () => {
  const { useAccount, useProvider } = hooks;

  const account = useAccount();
  const provider = useProvider();

  const [contract, setContract] = useState<NezhaInterest | null>(null);

  // 合约实例
  useEffect(() => {
    // 通过provider和account创建合约实例
    let contractInstance: NezhaInterest | undefined;
    if (provider && account) {
      const signer = provider.getSigner();
      contractInstance = NezhaInterest__factory.connect(CONTRACT_ADDRESS, signer);
      setContract(contractInstance);
      /**
       * solidity 事件监听
       * event Instructor(string memory msg);
       */
      // contractInstance.on('Instructor', (msg: string, age: ethers.BigNumber) => {
      //   console.log('contractInstance Event：', msg, age);
      // });
    }

    return () => {
      contractInstance?.removeAllListeners();
    };
  }, [provider, account]);

  // ================ ETH 操作 ================
  const [loadingEth, setLoadingEth] = useState(false);
  const [errorEth, setErrorEth] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [ethAmount, setEthAmount] = useState<string>('');
  const [isDepositingETH, setIsDepositingETH] = useState(false);
  const [isWithdrawingETH, setIsWithdrawingETH] = useState(false);

  // 获取ETH余额
  const getBalanceETH = async () => {
    if (!contract) return;
    setLoadingEth(true);
    setErrorEth('');
    try {
      // 调用合约地址 getBalanceETH 方法
      const balance = await contract.getBalanceETH();
      setEthBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log('error', error);
      setErrorEth(error as string);
    } finally {
      setLoadingEth(false);
    }
  };
  const handleDepositETH = () => {
    setIsDepositingETH(true);
    alert('ETH存款成功！');
  };

  const handleWithdrawETH = () => {
    setIsWithdrawingETH(true);
    alert('ETH提款成功！');
  };

  useEffect(() => {
    if (contract) {
      getBalanceETH();
    }
  }, [contract]);

  // ================ YD 操作 ================
  const [loadingYd, setLoadingYd] = useState(false);
  const [errorYd, setErrorYd] = useState<string | null>(null);
  const [ydBalance, setYdBalance] = useState<string | null>(null);
  const [ydAmount, setYdAmount] = useState<string>('');
  const [isApprovingYD, setIsApprovingYD] = useState(false);
  const [isDepositingYD, setIsDepositingYD] = useState(false);
  const [isWithdrawingYD, setIsWithdrawingYD] = useState(false);
  const [isApproveSuccess, setIsApproveSuccess] = useState(false);

  // 获取ETH余额
  const getBalanceYD = async () => {
    if (!contract) return;
    setLoadingYd(true);
    setErrorYd('');
    try {
      // 调用合约地址 getBalanceYD 方法
      const balance = await contract.getBalanceYD();
      console.log('balance');
      setYdBalance(balance.toString());
    } catch (error) {
      console.log('error', error);
      setErrorYd(error as string);
    } finally {
      setLoadingYd(false);
    }
  };
  const handleApproveYD = async () => {
    if (!contract) return;
    setIsApprovingYD(true);
    setErrorYd('');
    try {
      const signer = provider!.getSigner();
      const ydContract = YidengCoin__factory.connect(ERC20_ADDRESS, signer);
      console.log('ydContract', ydContract);
      const tx = await ydContract.approve(CONTRACT_ADDRESS, ethers.constants.MaxUint256);
      console.log('tx', tx);
      await tx.wait();
      alert('授权成功！');
    } catch (error) {
      console.log('error', error);
      setErrorYd(error as string);
    } finally {
      setIsApprovingYD(false);
    }
  };
  const handleDepositYD = () => {
    // 调用合约地址 setInfo 方法
    // const tx = await contract.setInfo('123', '456');
    // console.log('tx', tx);
    // await tx.wait();
    // console.log('tx wait');
    setIsDepositingYD(true);
    alert('YD存款成功！');
  };
  const handleWithdrawYD = () => {
    setIsWithdrawingYD(true);
    alert('YD提款成功！');
  };

  useEffect(() => {
    if (contract) {
      getBalanceYD();
    }
  }, [contract]);

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-md">
      <h1 className="text-2xl font-bold mb-4">InfoContractInterface</h1>

      {/* 显示账户 */}
      <p className="mb-4">Account: {account}</p>

      {/* ETH相关操作 */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">ETH操作</h3>
        <div className="mb-4 flex items-center">
          <h4 className="font-bold">ETH余额：</h4>
          {loadingEth ? (
            <p>加载中...</p>
          ) : errorEth ? (
            <p className="text-red-500">错误: {errorEth}</p>
          ) : (
            <p>{`${ethBalance || 0} ETH`}</p>
          )}
        </div>
        <div className="space-y-2">
          <input
            type="number"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
            className="border p-2 mr-2"
            placeholder="输入ETH数量"
            step="0.000000000000000001"
            min="0"
          />
          <div className="space-x-2">
            <button
              onClick={handleDepositETH}
              disabled={isDepositingETH}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isDepositingETH ? 'ETH存款处理中...' : 'ETH存款'}
            </button>
            <button
              onClick={handleWithdrawETH}
              disabled={isWithdrawingETH}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              {isWithdrawingETH ? 'ETH提款处理中...' : 'ETH提款'}
            </button>
          </div>
        </div>
      </div>

      {/* YD相关操作 */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">YD代币操作</h3>
        <div className="mb-4 flex items-center">
          <h4 className="font-bold">YD代币余额：</h4>
          {loadingYd ? (
            <p>加载中...</p>
          ) : errorYd ? (
            <p className="text-red-500">错误: {errorYd}</p>
          ) : (
            <p>{`${ydBalance || 0} YD`}</p>
          )}
        </div>
        <div className="space-y-2">
          <input
            type="number"
            value={ydAmount}
            onChange={(e) => setYdAmount(e.target.value)}
            className="border p-2 mr-2"
            placeholder="输入YD代币数量"
            step="1"
            min="0"
          />
          <div className="space-x-2">
            <button
              onClick={handleApproveYD}
              disabled={isApprovingYD}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              {isApprovingYD ? '授权处理中...' : '授权YD代币'}
            </button>
            <button
              onClick={handleDepositYD}
              disabled={isDepositingYD || !isApproveSuccess}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {isDepositingYD ? 'YD存款处理中...' : 'YD存款'}
            </button>
            <button
              onClick={handleWithdrawYD}
              disabled={isWithdrawingYD}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              {isWithdrawingYD ? 'YD提款处理中...' : 'YD提款'}
            </button>
          </div>
        </div>
      </div>

      {/* 交易状态提示 */}
      {/* {isApproveSuccess && <div className="text-green-500 mb-2">YD代币授权成功！</div>}
      {isDepositYDSuccess && <div className="text-green-500 mb-2">YD存款成功！</div>}
      {isWithdrawYDSuccess && <div className="text-green-500 mb-2">YD提款成功！</div>} */}
    </div>
  );
};

export default InfoContractInterface;

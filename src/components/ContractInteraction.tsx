import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { useState } from "react";
import Contract from "@/abis/NezhaInterest.json";

// 从 ABI 文件中获取合约地址
const CONTRACT_ADDRESS = "0xe9A2Ef4895d2c6d282AB5ce8572ed1E90E8F3FD2";

const ABI = Contract.abi;

export const ContractInteraction = () => {
  // const { isConnected, address } = useAccount();

  const [amount, setAmount] = useState("");

  // 读取ETH代币余额
  const {
    data: ethBalance,
    isPending: isReadingEth,
    error: ethError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getBalanceETH",
  });

  // 读取YD代币余额
  const { data: ydBalance, isPending: isReadingYD } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getBalanceYD",
  });

  // ETH存款功能
  const { writeContract: depositETH, data: depositETHHash, isPending: isDepositingETH } = useWriteContract();

  // YD存款功能
  const { writeContract: depositYD, data: depositYDHash, isPending: isDepositingYD } = useWriteContract();

  // ETH提款功能
  const { writeContract: withdrawETH, data: withdrawETHHash, isPending: isWithdrawingETH } = useWriteContract();

  // YD提款功能
  const { writeContract: withdrawYD, data: withdrawYDHash, isPending: isWithdrawingYD } = useWriteContract();

  // 交易确认状态
  const { isSuccess: isDepositETHSuccess } = useWaitForTransactionReceipt({
    hash: depositETHHash,
  });

  const { isSuccess: isDepositYDSuccess } = useWaitForTransactionReceipt({
    hash: depositYDHash,
  });

  const { isSuccess: isWithdrawETHSuccess } = useWaitForTransactionReceipt({
    hash: withdrawETHHash,
  });

  const { isSuccess: isWithdrawYDSuccess } = useWaitForTransactionReceipt({
    hash: withdrawYDHash,
  });

  // 处理ETH存款
  const handleDepositETH = () => {
    if (!amount) return;
    const weiAmount = BigInt(Math.floor(parseFloat(amount) * 1e18));
    depositETH({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "depositETH",
      value: weiAmount,
    });
  };

  // 处理YD存款
  const handleDepositYD = async () => {
    if (!amount) return;
    const res = await depositYD({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "depositYD",
      args: [100],
    });
    console.log("res", res);
  };

  // 处理ETH提款
  const handleWithdrawETH = () => {
    if (!amount) return;
    const weiAmount = BigInt(Math.floor(parseFloat(amount) * 1e18));
    withdrawETH({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "withdrawETH",
      args: [weiAmount],
    });
  };

  // 处理YD提款
  const handleWithdrawYD = () => {
    if (!amount) return;
    const weiAmount = BigInt(Math.floor(parseFloat(amount) * 1e18));
    withdrawYD({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "withdrawYD",
      args: [weiAmount],
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">利息合约交互</h2>

      {/* 显示ETH余额 */}
      <div className="mb-4">
        <h3 className="font-bold">ETH余额：</h3>
        {isReadingEth ? <p>加载中...</p> : ethError ? <p className="text-red-500">错误: {ethError.message}</p> : <p>{ethBalance ? `${Number(ethBalance) / 1e18} ETH` : "0 ETH"}</p>}
      </div>

      {/* 显示YD余额 */}
      <div className="mb-4">
        <h3 className="font-bold">YD代币余额：</h3>
        {isReadingYD ? <p>加载中...</p> : <p>{ydBalance ? `${Number(ydBalance)} YD` : "0 YD"}</p>}
      </div>

      {/* 存款/提款操作 */}
      <div className="mb-4">
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 mr-2" placeholder="输入ETH数量" step="0.000000000000000001" />
        <div className="mt-2 space-x-2">
          <button onClick={handleDepositETH} disabled={isDepositingETH} className="bg-blue-500 text-white px-4 py-2 rounded">
            {isDepositingETH ? "ETH存款处理中..." : "ETH存款"}
          </button>
          <button onClick={handleDepositYD} disabled={isDepositingYD} className="bg-green-500 text-white px-4 py-2 rounded">
            {isDepositingYD ? "YD存款处理中..." : "YD存款"}
          </button>
        </div>
        <div className="mt-2 space-x-2">
          <button onClick={handleWithdrawETH} disabled={isWithdrawingETH} className="bg-yellow-500 text-white px-4 py-2 rounded">
            {isWithdrawingETH ? "ETH提款处理中..." : "ETH提款"}
          </button>
          <button onClick={handleWithdrawYD} disabled={isWithdrawingYD} className="bg-red-500 text-white px-4 py-2 rounded">
            {isWithdrawingYD ? "YD提款处理中..." : "YD提款"}
          </button>
        </div>
      </div>

      {/* 交易状态提示 */}
      {isDepositETHSuccess && <div className="text-green-500 mb-2">ETH存款成功！</div>}
      {isDepositYDSuccess && <div className="text-green-500 mb-2">YD存款成功！</div>}
      {isWithdrawETHSuccess && <div className="text-green-500 mb-2">ETH提款成功！</div>}
      {isWithdrawYDSuccess && <div className="text-green-500 mb-2">YD提款成功！</div>}
    </div>
  );
};

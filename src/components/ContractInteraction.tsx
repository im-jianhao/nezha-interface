import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useSimulateContract } from "wagmi";
import { useState } from "react";
import Contract from "@abis/NezhaInterest.json";
import YidengCoin from "@abis/YidengCoin.json";
import { Address } from "viem";

// 从 ABI 文件中获取合约地址
const CONTRACT_ADDRESS = Contract.networks["11155111"].address as Address;
const ERC20_ADDRESS = "0x1491587f2b57d5cc0fd2162ab05f943c3b98e77f";

const ABI = Contract.abi;

export const ContractInteraction = () => {
  const [ethAmount, setEthAmount] = useState("");
  const [ydAmount, setYdAmount] = useState("");

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

  // ================== ETH ==================
  // 修改ETH相关操作使用ethAmount
  const handleDepositETH = () => {
    if (!ethAmount) return;
    const weiAmount = BigInt(Math.floor(parseFloat(ethAmount) * 1e18));
    depositETH({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "depositETH",
      value: weiAmount,
    });
  };

  const handleWithdrawETH = () => {
    if (!ethAmount) return;
    const weiAmount = BigInt(Math.floor(parseFloat(ethAmount) * 1e18));
    withdrawETH({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "withdrawETH",
      args: [weiAmount],
    });
  };

  // ================== YD ==================
  // 添加YD代币approve相关的hooks
  const { writeContract: approveYD, data: approveHash, isPending: isApprovingYD } = useWriteContract();

  const { isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  // 处理YD提款
  const handleWithdrawYD = () => {
    if (!ydAmount) return;
    const tokenAmount = BigInt(ydAmount);
    withdrawYD({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "withdrawYD",
      args: [tokenAmount],
    });
  };

  // 同样也需要修改YD存款的逻辑

  const handleDepositYD = () => {
    if (!ydAmount) return;
    const tokenAmount = BigInt(ydAmount);
    depositYD({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "depositYD",
      args: [tokenAmount],
    });
  };

  // 修改YD相关操作使用ydAmount
  const handleApproveYD = () => {
    if (!ydAmount) return;
    const tokenAmount = BigInt(ydAmount);
    approveYD({
      address: ERC20_ADDRESS,
      abi: YidengCoin.abi,
      functionName: "approve",
      args: [CONTRACT_ADDRESS, tokenAmount],
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">利息合约交互</h2>

      {/* ETH相关操作 */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">ETH操作</h3>
        <div className="mb-4">
          <h4 className="font-bold">ETH余额：</h4>
          {isReadingEth ? <p>加载中...</p> : ethError ? <p className="text-red-500">错误: {ethError.message}</p> : <p>{ethBalance ? `${Number(ethBalance) / 1e18} ETH` : "0 ETH"}</p>}
        </div>
        <div className="space-y-2">
          <input type="number" value={ethAmount} onChange={(e) => setEthAmount(e.target.value)} className="border p-2 mr-2" placeholder="输入ETH数量" step="0.000000000000000001" min="0" />
          <div className="space-x-2">
            <button onClick={handleDepositETH} disabled={isDepositingETH} className="bg-blue-500 text-white px-4 py-2 rounded">
              {isDepositingETH ? "ETH存款处理中..." : "ETH存款"}
            </button>
            <button onClick={handleWithdrawETH} disabled={isWithdrawingETH} className="bg-yellow-500 text-white px-4 py-2 rounded">
              {isWithdrawingETH ? "ETH提款处理中..." : "ETH提款"}
            </button>
          </div>
        </div>
      </div>

      {/* YD相关操作 */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">YD代币操作</h3>
        <div className="mb-4">
          <h4 className="font-bold">YD代币余额：</h4>
          {isReadingYD ? <p>加载中...</p> : <p>{ydBalance ? `${Number(ydBalance)} YD` : "0 YD"}</p>}
        </div>
        <div className="space-y-2">
          <input type="number" value={ydAmount} onChange={(e) => setYdAmount(e.target.value)} className="border p-2 mr-2" placeholder="输入YD代币数量" step="1" min="0" />
          <div className="space-x-2">
            <button onClick={handleApproveYD} disabled={isApprovingYD} className="bg-purple-500 text-white px-4 py-2 rounded">
              {isApprovingYD ? "授权处理中..." : "授权YD代币"}
            </button>
            <button onClick={handleDepositYD} disabled={isDepositingYD || !isApproveSuccess} className="bg-green-500 text-white px-4 py-2 rounded">
              {isDepositingYD ? "YD存款处理中..." : "YD存款"}
            </button>
            <button onClick={handleWithdrawYD} disabled={isWithdrawingYD} className="bg-yellow-500 text-white px-4 py-2 rounded">
              {isWithdrawingYD ? "YD提款处理中..." : "YD提款"}
            </button>
          </div>
        </div>
      </div>

      {/* 交易状态提示 */}
      {isDepositETHSuccess && <div className="text-green-500 mb-2">ETH存款成功！</div>}
      {isWithdrawETHSuccess && <div className="text-green-500 mb-2">ETH提款成功！</div>}
      {isApproveSuccess && <div className="text-green-500 mb-2">YD代币授权成功！</div>}
      {isDepositYDSuccess && <div className="text-green-500 mb-2">YD存款成功！</div>}
      {isWithdrawYDSuccess && <div className="text-green-500 mb-2">YD提款成功！</div>}
    </div>
  );
};

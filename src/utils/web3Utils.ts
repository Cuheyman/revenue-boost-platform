import { ethers } from "ethers";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask to use this feature");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    return { provider, signer, address };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

export const simulateTradeWithAI = async (
  amount: number,
  stopLoss: number,
  maxPosition: number
) => {
  // Simulated AI analysis - this would be replaced with actual AI model in production
  const mockAnalysis = {
    recommendation: "BUY",
    confidence: 0.85,
    predictedReturn: 2.5,
    riskLevel: "MEDIUM",
    reasoning: "Strong momentum indicators and positive market sentiment",
  };

  return mockAnalysis;
};

export const deployContract = async (signer: ethers.Signer, abi: any, bytecode: string, args: any[] = []) => {
  try {
    const factory = new ethers.ContractFactory(abi, bytecode, signer);
    const contract = await factory.deploy(...args);
    await contract.deployed();
    return contract;
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
};

export const getTokenBalance = async (
  tokenAddress: string,
  walletAddress: string,
  provider: ethers.providers.Provider
) => {
  try {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function balanceOf(address) view returns (uint256)"],
      provider
    );
    const balance = await tokenContract.balanceOf(walletAddress);
    return balance;
  } catch (error) {
    console.error("Error getting token balance:", error);
    throw error;
  }
};


import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { connectWallet } from "@/utils/web3Utils";

const SmartContractSection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const { address } = await connectWallet();
      setWalletAddress(address);
      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card className="glass-card p-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">
        Smart Contract Management
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Wallet Status</p>
            <p className="text-slate-900">
              {walletAddress
                ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Not Connected"}
            </p>
          </div>
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="hover-scale"
          >
            {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {walletAddress ? "Connected" : "Connect Wallet"}
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 hover-scale">
            <h4 className="font-medium mb-2">Deploy New Contract</h4>
            <p className="text-sm text-slate-600 mb-3">
              Create and deploy a new smart contract to the network
            </p>
            <Button
              variant="outline"
              disabled={!walletAddress}
              className="w-full"
            >
              Deploy Contract
            </Button>
          </Card>
          
          <Card className="p-4 hover-scale">
            <h4 className="font-medium mb-2">Interact with Contract</h4>
            <p className="text-sm text-slate-600 mb-3">
              Connect and interact with existing smart contracts
            </p>
            <Button
              variant="outline"
              disabled={!walletAddress}
              className="w-full"
            >
              Interact
            </Button>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default SmartContractSection;

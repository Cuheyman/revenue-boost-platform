
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Loader2, AlertTriangle } from "lucide-react";
import { connectWallet, getTokenBalance } from "@/utils/web3Utils";

const SmartContractSection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [maxPosition, setMaxPosition] = useState("");
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

  const handleDeploy = () => {
    if (!stopLoss || !maxPosition) {
      toast({
        title: "Validation Error",
        description: "Please set both stop-loss and maximum position size",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Risk Management Setup",
      description: "Stop-loss and position limits configured successfully",
    });
  };

  return (
    <Card className="glass-card p-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">
        Trading Risk Management
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
        
        <div className="grid gap-4">
          <Card className="p-4">
            <div className="flex items-start space-x-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <p className="text-sm text-slate-600">
                Set up risk management parameters to protect your trading position
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Stop Loss (%)</label>
                <Input
                  type="number"
                  placeholder="e.g., 2.5"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">Maximum Position Size (%)</label>
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  value={maxPosition}
                  onChange={(e) => setMaxPosition(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button
                onClick={handleDeploy}
                disabled={!walletAddress || !stopLoss || !maxPosition}
                className="w-full"
              >
                Set Risk Parameters
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium mb-2">Current Protection</h4>
            <div className="space-y-2">
              <p className="text-sm text-slate-600">
                Stop Loss: {stopLoss ? `${stopLoss}%` : 'Not set'}
              </p>
              <p className="text-sm text-slate-600">
                Max Position: {maxPosition ? `${maxPosition}%` : 'Not set'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default SmartContractSection;


import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Loader2, AlertTriangle, Brain, TrendingUp } from "lucide-react";
import { connectWallet, simulateTradeWithAI } from "@/utils/web3Utils";

const SmartContractSection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [maxPosition, setMaxPosition] = useState("");
  const [tradeAmount, setTradeAmount] = useState("");
  const [aiRecommendation, setAiRecommendation] = useState<any>(null);
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

  const handleAnalyze = async () => {
    if (!stopLoss || !maxPosition || !tradeAmount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields before analysis",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await simulateTradeWithAI(
        Number(tradeAmount),
        Number(stopLoss),
        Number(maxPosition)
      );
      setAiRecommendation(analysis);
      toast({
        title: "Analysis Complete",
        description: "AI has generated trading recommendations",
      });
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Failed to generate AI recommendations",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="glass-card p-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">
        AI Trading Assistant (Simulation Mode)
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
              <Brain className="h-5 w-5 text-blue-500" />
              <p className="text-sm text-slate-600">
                Configure your trading parameters for AI analysis
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Trade Amount (USD)</label>
                <Input
                  type="number"
                  placeholder="e.g., 1000"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className="mt-1"
                />
              </div>

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
                onClick={handleAnalyze}
                disabled={!walletAddress || !stopLoss || !maxPosition || !tradeAmount || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analyze Trade
                  </>
                )}
              </Button>
            </div>
          </Card>

          {aiRecommendation && (
            <Card className="p-4 bg-slate-50">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-500" />
                AI Recommendation
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-slate-600">
                  Action: <span className="font-medium">{aiRecommendation.recommendation}</span>
                </p>
                <p className="text-sm text-slate-600">
                  Confidence: <span className="font-medium">{(aiRecommendation.confidence * 100).toFixed(1)}%</span>
                </p>
                <p className="text-sm text-slate-600">
                  Expected Return: <span className="font-medium">{aiRecommendation.predictedReturn}%</span>
                </p>
                <p className="text-sm text-slate-600">
                  Risk Level: <span className="font-medium">{aiRecommendation.riskLevel}</span>
                </p>
                <p className="text-sm text-slate-600">
                  Reasoning: <span className="font-medium">{aiRecommendation.reasoning}</span>
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SmartContractSection;

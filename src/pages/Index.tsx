import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, Wallet2, BarChart3, ArrowRight } from "lucide-react";
import SmartContractSection from "@/components/SmartContractSection";
import { Navbar } from "@/components/Navbar";

const dummyData = [
  { day: "Mon", revenue: 4000 },
  { day: "Tue", revenue: 3000 },
  { day: "Wed", revenue: 5000 },
  { day: "Thu", revenue: 2780 },
  { day: "Fri", revenue: 1890 },
  { day: "Sat", revenue: 6390 },
  { day: "Sun", revenue: 3490 },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-8 md:px-8">
      <Navbar />
      <div className="max-w-7xl mx-auto space-y-8 slide-up">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900">
              Revenue Boost Platform
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Leverage smart contracts to generate passive income through
              decentralized finance strategies.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="hover-scale bg-slate-900 hover:bg-slate-800"
            >
              Connect Wallet
              <Wallet2 className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover-scale"
            >
              View Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card p-6 hover-scale">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-slate-900">$24,685</h3>
              </div>
              <div className="p-2 bg-emerald-100 rounded-full">
                <ArrowUpRight className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-emerald-600 mt-2">+12.5% from last week</p>
          </Card>

          <Card className="glass-card p-6 hover-scale">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Users</p>
                <h3 className="text-2xl font-bold text-slate-900">1,284</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">+5.2% from last week</p>
          </Card>

          <Card className="glass-card p-6 hover-scale">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Smart Contracts</p>
                <h3 className="text-2xl font-bold text-slate-900">8</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Wallet2 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">All contracts active</p>
          </Card>
        </section>

        {/* Smart Contract Section */}
        <SmartContractSection />

        {/* Chart Section */}
        <Card className="glass-card p-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Weekly Revenue Overview
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card p-6 hover-scale">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Smart Contract Integration
            </h3>
            <p className="text-slate-600">
              Our platform leverages advanced smart contracts to automate revenue
              generation through yield farming and liquidity provision.
            </p>
          </Card>
          <Card className="glass-card p-6 hover-scale">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Real-time Analytics
            </h3>
            <p className="text-slate-600">
              Track your earnings and portfolio performance with our comprehensive
              analytics dashboard updated in real-time.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;

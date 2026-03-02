import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

interface ChartData {
    name: string;
    value: number;
    color: string;
}

interface ActivityChartsProps {
    leetcodeData: ChartData[];
    githubData: { name: string; value: number }[];
}

const ActivityCharts = ({ leetcodeData, githubData }: ActivityChartsProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LeetCode Distribution */}
            <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 flex flex-col items-center shadow-2xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-8 text-center bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    LeetCode Difficulty
                </h3>
                <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                <linearGradient id="easyGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4ade80" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#22c55e" stopOpacity={1} />
                                </linearGradient>
                                <linearGradient id="mediumGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={1} />
                                </linearGradient>
                                <linearGradient id="hardGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f87171" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <Pie
                                data={leetcodeData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {leetcodeData.map((entry, index) => {
                                    const gradientId = entry.name === "Easy" ? "easyGradient" :
                                        entry.name === "Medium" ? "mediumGradient" :
                                            "hardGradient";
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={`url(#${gradientId})`}
                                            style={{ filter: `drop-shadow(0 0 6px ${entry.color}40)` }}
                                        />
                                    );
                                })}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(0,0,0,0.8)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    borderRadius: "12px",
                                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.5)",
                                }}
                                itemStyle={{ color: "#fff" }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                formatter={(value) => <span className="text-white/80 font-medium px-2">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* GitHub Languages */}
            <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 shadow-2xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-8 text-center bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Top Languages (GitHub)
                </h3>
                <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={githubData} layout="vertical" margin={{ left: 20, right: 30 }}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#4ade80" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#22c55e" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                stroke="#fff"
                                fontSize={13}
                                fontWeight="bold"
                                tickLine={false}
                                axisLine={false}
                                width={100}
                                tick={{ fill: 'rgba(255,255,255,0.9)' }}
                            />
                            <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.08)" }}
                                contentStyle={{
                                    backgroundColor: "rgba(0,0,0,0.8)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    borderRadius: "12px",
                                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.5)",
                                }}
                                itemStyle={{ color: "#fff" }}
                            />
                            <Bar
                                dataKey="value"
                                fill="url(#barGradient)"
                                radius={[0, 8, 8, 0]}
                                barSize={24}
                                style={{ filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.3))' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ActivityCharts;

"use client";

import {
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	YAxis,
	Legend,
	ResponsiveContainer,
} from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Sample student data
const chartData = [
	{ month: "Jan", band: 5.5, target: 7 },
	{ month: "Feb", band: 6.0, target: 7 },
	{ month: "Mar", band: 6.0, target: 7 },
	{ month: "Apr", band: 6.5, target: 7 },
	{ month: "May", band: 6.5, target: 7 },
	{ month: "Jun", band: 7.0, target: 7 },
];

const chartConfig = {
	band: {
		label: "Actual Band",
		color: "#ef4444", // Tailwind red-500
	},
	target: {
		label: "Target Band",
		color: "#9ca3af", // Tailwind gray-400
	},
} satisfies ChartConfig;

const ProgressChart = () => {
	return (
		<div className="w-full lg:h-64 md:h-64 text-sm">
			<ChartContainer config={chartConfig} className="h-full w-full">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={chartData}
						margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
					>
						<CartesianGrid
							vertical={false}
							strokeDasharray="3 3"
							stroke="#374151" // Tailwind gray-700
						/>
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#9ca3af" }} // gray-400
							tickMargin={8}
						/>
						<YAxis
							domain={[4, 9]} // Adjusted to fit band scores
							tickCount={6}
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#9ca3af" }}
							tickMargin={8}
						/>
						<Legend verticalAlign="top" height={36} />
						<ChartTooltip content={<ChartTooltipContent />} />
						<Line
							type="linear"
							dataKey="band"
							stroke="#ef4444"
							strokeWidth={2}
							dot
						/>
						<Line
							type="monotone"
							dataKey="target"
							stroke="#9ca3af"
							strokeWidth={2}
							strokeDasharray="5 5"
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	);
};

export default ProgressChart;

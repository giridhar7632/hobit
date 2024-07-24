import React from 'react'
import { View } from 'react-native'
import Svg, { Rect, G, Text as SvgText } from 'react-native-svg'
import * as d3 from 'd3'

type TimeData = {
	value: number
	x: number // month
	y: number // day
}

type CalendarHeatmapProps = {
	data: TimeData[]
	width: number
	height: number
}

const MARGIN = { top: 20, right: 20, bottom: 20, left: 20 }
const NUM_WEEKS = 7
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const CalendarHeatmap = ({
	data,
	width,
	height,
}: CalendarHeatmapProps) => {
	const chartWidth = width - MARGIN.left - MARGIN.right
	const chartHeight = height - MARGIN.top - MARGIN.bottom

	// xScale for months
	const xScale = d3
		.scaleBand<number>()
		.domain([...new Set(data.map((d) => d.x))]) // Unique months
		.range([0, chartWidth])
		.padding(0.05)

	// yScale for days of the month
	const yScale = d3
		.scaleBand<number>()
		.domain([...new Set(data.map((d) => d.y))]) // Unique days
		.range([0, chartHeight])
		.padding(0.05)

	// Color scale based on value
	const colorScale = d3
		.scaleSequential<number>()
		.domain([0, d3.max(data, (d) => d.value) || 0])
		.interpolator(d3.interpolateBlues)

	return (
		<View>
			<Svg width={width} height={height}>
				<G transform={`translate(${MARGIN.left},${MARGIN.top})`}>
					{/* Draw day labels */}
					{DAYS_OF_WEEK.map((day, i) => (
						<SvgText
							key={i}
							x={-10}
							y={(i + 1) * (chartHeight / DAYS_OF_WEEK.length) - 5}
							fontSize={10}
							textAnchor='end'
							alignmentBaseline='middle'>
							{day}
						</SvgText>
					))}
					{/* Draw the heatmap rectangles */}
					{data.map((d, i) => (
						<Rect
							key={i}
							x={xScale(d.x)}
							y={yScale(d.y)}
							width={xScale.bandwidth()}
							height={yScale.bandwidth()}
							fill={colorScale(d.value)}
							rx={2}
							ry={2}
						/>
					))}
				</G>
			</Svg>
		</View>
	)
}

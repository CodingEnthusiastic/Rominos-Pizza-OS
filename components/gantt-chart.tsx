"use client"

import { useRef } from "react"
import type { GanttChartItem } from "@/lib/types"

interface GanttChartProps {
  data: GanttChartItem[]
}

const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
]

export default function GanttChart({ data }: GanttChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  // Find the end time of the last process
  const endTime = data.length > 0 ? Math.max(...data.map((item) => item.endTime)) : 0

  // Get unique process IDs to assign consistent colors
  const processIds = Array.from(new Set(data.map((item) => item.processId)))

  // Create a mapping of process IDs to colors
  const processColors: Record<number, string> = {}
  processIds.forEach((id, index) => {
    processColors[id] = colors[index % colors.length]
  })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Gantt Chart</h3>

      <div className="relative overflow-x-auto" ref={chartRef}>
        <div className="min-w-full" style={{ minWidth: `${Math.max(500, endTime * 30)}px` }}>
          {/* Time scale */}
          <div className="flex border-b">
            {Array.from({ length: endTime + 1 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 text-xs text-center" style={{ width: "30px" }}>
                {i}
              </div>
            ))}
          </div>

          {/* Gantt bars */}
          <div className="h-16 relative mt-2">
            {data.map((item, index) => {
              const width = (item.endTime - item.startTime) * 30
              const left = item.startTime * 30

              return (
                <div
                  key={index}
                  className={`absolute rounded-md flex items-center justify-center text-white text-xs font-medium ${processColors[item.processId]}`}
                  style={{
                    left: `${left}px`,
                    width: `${width}px`,
                    height: "40px",
                    top: "0",
                  }}
                  title={`Process ${item.processId} (${item.startTime}-${item.endTime})`}
                >
                  {item.name}
                </div>
              )
            })}
          </div>

          {/* Process timeline markers */}
          <div className="flex border-t mt-2 pt-1">
            {Array.from({ length: endTime + 1 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 text-xs text-center relative" style={{ width: "30px" }}>
                <div className="absolute h-2 w-px bg-gray-300 left-1/2 -top-3"></div>
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4">
        {processIds.map((id, index) => {
          const process = data.find((item) => item.processId === id)
          return (
            <div key={id} className="flex items-center">
              <div className={`w-4 h-4 rounded mr-1 ${processColors[id]}`}></div>
              <span className="text-sm">{process?.name || `Process ${id}`}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}


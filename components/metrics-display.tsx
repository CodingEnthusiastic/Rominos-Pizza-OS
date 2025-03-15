import { Card, CardContent } from "@/components/ui/card"
import type { SchedulingResult } from "@/lib/types"

interface MetricsDisplayProps {
  results: SchedulingResult
}

export default function MetricsDisplay({ results }: MetricsDisplayProps) {
  const { waitingTimes, turnaroundTimes, averageWaitingTime, averageTurnaroundTime, completionTimes } = results

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Waiting Times</h3>
            <div className="space-y-2">
              {Object.entries(waitingTimes).map(([id, time]) => (
                <div key={id} className="flex justify-between">
                  <span>{results.processNames[Number.parseInt(id)] || `Process ${id}`}</span>
                  <span className="font-medium">{time} time units</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Average Waiting Time</span>
                  <span>{averageWaitingTime.toFixed(2)} time units</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Turnaround Times</h3>
            <div className="space-y-2">
              {Object.entries(turnaroundTimes).map(([id, time]) => (
                <div key={id} className="flex justify-between">
                  <span>{results.processNames[Number.parseInt(id)] || `Process ${id}`}</span>
                  <span className="font-medium">{time} time units</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Average Turnaround Time</span>
                  <span>{averageTurnaroundTime.toFixed(2)} time units</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Process Completion Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Process
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival Time
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Time
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turnaround Time
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waiting Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(completionTimes).map(([id, time]) => {
                  const processId = Number.parseInt(id)
                  return (
                    <tr key={id}>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {results.processNames[processId] || `Process ${id}`}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">{results.arrivalTimes[processId]}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{time}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{turnaroundTimes[processId]}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{waitingTimes[processId]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


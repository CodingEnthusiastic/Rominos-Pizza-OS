export interface Pizza {
  id: number
  name: string
  cookingTime: number
  deliveryDistance: number
  priority: number
  arrivalTime: number
}

export interface PizzaOrder {
  id: number
  name: string
  processTime: number
  priority: number
  arrivalTime: number
}

export interface GanttChartItem {
  processId: number
  name: string
  startTime: number
  endTime: number
}

export interface SchedulingResult {
  ganttChart: GanttChartItem[]
  waitingTimes: Record<number, number>
  turnaroundTimes: Record<number, number>
  completionTimes: Record<number, number>
  averageWaitingTime: number
  averageTurnaroundTime: number
  processNames: Record<number, string>
  arrivalTimes: Record<number, number>
}


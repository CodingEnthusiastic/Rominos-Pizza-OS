import type { PizzaOrder, GanttChartItem, SchedulingResult } from "./types"

// First Come First Served (FCFS) Algorithm
function fcfs(orders: PizzaOrder[]): SchedulingResult {
  // Sort orders by arrival time
  const sortedOrders = [...orders].sort((a, b) => a.arrivalTime - b.arrivalTime)

  const ganttChart: GanttChartItem[] = []
  const waitingTimes: Record<number, number> = {}
  const turnaroundTimes: Record<number, number> = {}
  const completionTimes: Record<number, number> = {}
  const processNames: Record<number, string> = {}
  const arrivalTimes: Record<number, number> = {}

  let currentTime = 0

  for (const order of sortedOrders) {
    processNames[order.id] = order.name
    arrivalTimes[order.id] = order.arrivalTime

    // Update current time if there's a gap between arrival and current time
    if (order.arrivalTime > currentTime) {
      currentTime = order.arrivalTime
    }

    // Calculate waiting time
    waitingTimes[order.id] = currentTime - order.arrivalTime

    // Add to Gantt chart
    ganttChart.push({
      processId: order.id,
      name: order.name,
      startTime: currentTime,
      endTime: currentTime + order.processTime,
    })

    // Update current time
    currentTime += order.processTime

    // Calculate completion and turnaround times
    completionTimes[order.id] = currentTime
    turnaroundTimes[order.id] = completionTimes[order.id] - order.arrivalTime
  }

  // Calculate averages
  const avgWaitingTime = Object.values(waitingTimes).reduce((sum, time) => sum + time, 0) / orders.length
  const avgTurnaroundTime = Object.values(turnaroundTimes).reduce((sum, time) => sum + time, 0) / orders.length

  return {
    ganttChart,
    waitingTimes,
    turnaroundTimes,
    completionTimes,
    averageWaitingTime: avgWaitingTime,
    averageTurnaroundTime: avgTurnaroundTime,
    processNames,
    arrivalTimes,
  }
}

// Shortest Job First (SJF) Algorithm - Non-preemptive
function sjf(orders: PizzaOrder[]): SchedulingResult {
  const ganttChart: GanttChartItem[] = []
  const waitingTimes: Record<number, number> = {}
  const turnaroundTimes: Record<number, number> = {}
  const completionTimes: Record<number, number> = {}
  const processNames: Record<number, string> = {}
  const arrivalTimes: Record<number, number> = {}

  // Create a copy of orders to work with
  const remainingOrders = [...orders]
  remainingOrders.forEach((order) => {
    processNames[order.id] = order.name
    arrivalTimes[order.id] = order.arrivalTime
  })

  let currentTime = 0

  while (remainingOrders.length > 0) {
    // Find orders that have arrived by the current time
    const availableOrders = remainingOrders.filter((order) => order.arrivalTime <= currentTime)

    if (availableOrders.length === 0) {
      // No orders available yet, jump to the next arrival time
      const nextArrival = Math.min(...remainingOrders.map((order) => order.arrivalTime))
      currentTime = nextArrival
      continue
    }

    // Find the order with the shortest process time
    const shortestOrder = availableOrders.reduce((prev, curr) => (prev.processTime < curr.processTime ? prev : curr))

    // Calculate waiting time
    waitingTimes[shortestOrder.id] = currentTime - shortestOrder.arrivalTime

    // Add to Gantt chart
    ganttChart.push({
      processId: shortestOrder.id,
      name: shortestOrder.name,
      startTime: currentTime,
      endTime: currentTime + shortestOrder.processTime,
    })

    // Update current time
    currentTime += shortestOrder.processTime

    // Calculate completion and turnaround times
    completionTimes[shortestOrder.id] = currentTime
    turnaroundTimes[shortestOrder.id] = completionTimes[shortestOrder.id] - shortestOrder.arrivalTime

    // Remove the processed order
    const index = remainingOrders.findIndex((order) => order.id === shortestOrder.id)
    remainingOrders.splice(index, 1)
  }

  // Calculate averages
  const avgWaitingTime = Object.values(waitingTimes).reduce((sum, time) => sum + time, 0) / orders.length
  const avgTurnaroundTime = Object.values(turnaroundTimes).reduce((sum, time) => sum + time, 0) / orders.length

  return {
    ganttChart,
    waitingTimes,
    turnaroundTimes,
    completionTimes,
    averageWaitingTime: avgWaitingTime,
    averageTurnaroundTime: avgTurnaroundTime,
    processNames,
    arrivalTimes,
  }
}

// Priority Scheduling Algorithm - Non-preemptive
function priorityScheduling(orders: PizzaOrder[]): SchedulingResult {
  const ganttChart: GanttChartItem[] = []
  const waitingTimes: Record<number, number> = {}
  const turnaroundTimes: Record<number, number> = {}
  const completionTimes: Record<number, number> = {}
  const processNames: Record<number, string> = {}
  const arrivalTimes: Record<number, number> = {}

  // Create a copy of orders to work with
  const remainingOrders = [...orders]
  remainingOrders.forEach((order) => {
    processNames[order.id] = order.name
    arrivalTimes[order.id] = order.arrivalTime
  })

  let currentTime = 0

  while (remainingOrders.length > 0) {
    // Find orders that have arrived by the current time
    const availableOrders = remainingOrders.filter((order) => order.arrivalTime <= currentTime)

    if (availableOrders.length === 0) {
      // No orders available yet, jump to the next arrival time
      const nextArrival = Math.min(...remainingOrders.map((order) => order.arrivalTime))
      currentTime = nextArrival
      continue
    }

    // Find the order with the highest priority
    const highestPriorityOrder = availableOrders.reduce((prev, curr) => (prev.priority > curr.priority ? prev : curr))

    // Calculate waiting time
    waitingTimes[highestPriorityOrder.id] = currentTime - highestPriorityOrder.arrivalTime

    // Add to Gantt chart
    ganttChart.push({
      processId: highestPriorityOrder.id,
      name: highestPriorityOrder.name,
      startTime: currentTime,
      endTime: currentTime + highestPriorityOrder.processTime,
    })

    // Update current time
    currentTime += highestPriorityOrder.processTime

    // Calculate completion and turnaround times
    completionTimes[highestPriorityOrder.id] = currentTime
    turnaroundTimes[highestPriorityOrder.id] =
      completionTimes[highestPriorityOrder.id] - highestPriorityOrder.arrivalTime

    // Remove the processed order
    const index = remainingOrders.findIndex((order) => order.id === highestPriorityOrder.id)
    remainingOrders.splice(index, 1)
  }

  // Calculate averages
  const avgWaitingTime = Object.values(waitingTimes).reduce((sum, time) => sum + time, 0) / orders.length
  const avgTurnaroundTime = Object.values(turnaroundTimes).reduce((sum, time) => sum + time, 0) / orders.length

  return {
    ganttChart,
    waitingTimes,
    turnaroundTimes,
    completionTimes,
    averageWaitingTime: avgWaitingTime,
    averageTurnaroundTime: avgTurnaroundTime,
    processNames,
    arrivalTimes,
  }
}

// Round Robin Algorithm
function roundRobin(orders: PizzaOrder[], timeQuantum: number): SchedulingResult {
  const ganttChart: GanttChartItem[] = []
  const waitingTimes: Record<number, number> = {}
  const turnaroundTimes: Record<number, number> = {}
  const completionTimes: Record<number, number> = {}
  const processNames: Record<number, string> = {}
  const arrivalTimes: Record<number, number> = {}

  // Initialize remaining time for each order
  const remainingTime: Record<number, number> = {}
  orders.forEach((order) => {
    remainingTime[order.id] = order.processTime
    processNames[order.id] = order.name
    arrivalTimes[order.id] = order.arrivalTime
  })

  // Sort orders by arrival time
  const sortedOrders = [...orders].sort((a, b) => a.arrivalTime - b.arrivalTime)

  // Create a queue for ready processes
  const queue: number[] = []
  let currentTime = 0
  let completed = 0

  // Add the first process to the queue
  if (sortedOrders.length > 0) {
    queue.push(sortedOrders[0].id)
    currentTime = sortedOrders[0].arrivalTime
  }

  // Process until all orders are completed
  while (completed < orders.length) {
    if (queue.length === 0) {
      // Find the next process to arrive
      const nextProcess = sortedOrders.find((order) => order.arrivalTime > currentTime && remainingTime[order.id] > 0)

      if (nextProcess) {
        currentTime = nextProcess.arrivalTime
        queue.push(nextProcess.id)
      }
      continue
    }

    // Get the next process from the queue
    const currentProcessId = queue.shift()!
    const currentProcess = orders.find((order) => order.id === currentProcessId)!

    // Calculate execution time for this round
    const executeTime = Math.min(remainingTime[currentProcessId], timeQuantum)

    // Add to Gantt chart
    ganttChart.push({
      processId: currentProcessId,
      name: currentProcess.name,
      startTime: currentTime,
      endTime: currentTime + executeTime,
    })

    // Update current time
    currentTime += executeTime

    // Update remaining time
    remainingTime[currentProcessId] -= executeTime

    // Check for new arrivals during this time quantum
    sortedOrders.forEach((order) => {
      if (
        order.arrivalTime > currentTime - executeTime &&
        order.arrivalTime <= currentTime &&
        remainingTime[order.id] > 0 &&
        order.id !== currentProcessId
      ) {
        if (!queue.includes(order.id)) {
          queue.push(order.id)
        }
      }
    })

    // Check if the process is completed
    if (remainingTime[currentProcessId] === 0) {
      completed++
      completionTimes[currentProcessId] = currentTime
      turnaroundTimes[currentProcessId] = completionTimes[currentProcessId] - currentProcess.arrivalTime
      waitingTimes[currentProcessId] = turnaroundTimes[currentProcessId] - currentProcess.processTime
    } else {
      // Put the process back in the queue
      queue.push(currentProcessId)
    }
  }

  // Calculate averages
  const avgWaitingTime = Object.values(waitingTimes).reduce((sum, time) => sum + time, 0) / orders.length
  const avgTurnaroundTime = Object.values(turnaroundTimes).reduce((sum, time) => sum + time, 0) / orders.length

  return {
    ganttChart,
    waitingTimes,
    turnaroundTimes,
    completionTimes,
    averageWaitingTime: avgWaitingTime,
    averageTurnaroundTime: avgTurnaroundTime,
    processNames,
    arrivalTimes,
  }
}

// Combined Algorithm (SJF + Priority)
function combinedAlgorithm(orders: PizzaOrder[], timeQuantum: number): SchedulingResult {
  const ganttChart: GanttChartItem[] = []
  const waitingTimes: Record<number, number> = {}
  const turnaroundTimes: Record<number, number> = {}
  const completionTimes: Record<number, number> = {}
  const processNames: Record<number, string> = {}
  const arrivalTimes: Record<number, number> = {}

  // Create a copy of orders to work with
  const remainingOrders = [...orders]
  remainingOrders.forEach((order) => {
    processNames[order.id] = order.name
    arrivalTimes[order.id] = order.arrivalTime
  })

  let currentTime = 0

  while (remainingOrders.length > 0) {
    // Find orders that have arrived by the current time
    const availableOrders = remainingOrders.filter((order) => order.arrivalTime <= currentTime)

    if (availableOrders.length === 0) {
      // No orders available yet, jump to the next arrival time
      const nextArrival = Math.min(...remainingOrders.map((order) => order.arrivalTime))
      currentTime = nextArrival
      continue
    }

    // Calculate a score for each order based on both process time and priority
    // Lower process time and higher priority result in a better (lower) score
    const scoredOrders = availableOrders.map((order) => ({
      ...order,
      // Normalize process time and priority to be in similar ranges
      // Lower score is better
      score: order.processTime / 5 - order.priority / 2,
    }))

    // Find the order with the best score
    const bestOrder = scoredOrders.reduce((prev, curr) => (prev.score < curr.score ? prev : curr))

    // Calculate waiting time
    waitingTimes[bestOrder.id] = currentTime - bestOrder.arrivalTime

    // Add to Gantt chart
    ganttChart.push({
      processId: bestOrder.id,
      name: bestOrder.name,
      startTime: currentTime,
      endTime: currentTime + bestOrder.processTime,
    })

    // Update current time
    currentTime += bestOrder.processTime

    // Calculate completion and turnaround times
    completionTimes[bestOrder.id] = currentTime
    turnaroundTimes[bestOrder.id] = completionTimes[bestOrder.id] - bestOrder.arrivalTime

    // Remove the processed order
    const index = remainingOrders.findIndex((order) => order.id === bestOrder.id)
    remainingOrders.splice(index, 1)
  }

  // Calculate averages
  const avgWaitingTime = Object.values(waitingTimes).reduce((sum, time) => sum + time, 0) / orders.length
  const avgTurnaroundTime = Object.values(turnaroundTimes).reduce((sum, time) => sum + time, 0) / orders.length

  return {
    ganttChart,
    waitingTimes,
    turnaroundTimes,
    completionTimes,
    averageWaitingTime: avgWaitingTime,
    averageTurnaroundTime: avgTurnaroundTime,
    processNames,
    arrivalTimes,
  }
}

// Main function to schedule pizzas based on selected algorithm
export function schedulePizzas(orders: PizzaOrder[], algorithm: string, timeQuantum = 4): SchedulingResult {
  switch (algorithm) {
    case "fcfs":
      return fcfs(orders)
    case "sjf":
      return sjf(orders)
    case "priority":
      return priorityScheduling(orders)
    case "round-robin":
      return roundRobin(orders, timeQuantum)
    case "combined":
      return combinedAlgorithm(orders, timeQuantum)
    default:
      return fcfs(orders)
  }
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { Pizza, PizzaOrder, SchedulingResult } from "@/lib/types"
import { schedulePizzas } from "@/lib/scheduling-algorithms"
import GanttChart from "@/components/gantt-chart"
import MetricsDisplay from "@/components/metrics-display"
import { PizzaIcon, ClockIcon, TruckIcon, PlusIcon, TrashIcon } from "lucide-react"

const initialPizzas: Pizza[] = [
  { id: 1, name: "Margherita", cookingTime: 10, deliveryDistance: 5, priority: 2, arrivalTime: 0 },
  { id: 2, name: "Pepperoni", cookingTime: 12, deliveryDistance: 3, priority: 3, arrivalTime: 2 },
  { id: 3, name: "Hawaiian", cookingTime: 8, deliveryDistance: 7, priority: 1, arrivalTime: 4 },
  { id: 4, name: "Vegetarian", cookingTime: 15, deliveryDistance: 2, priority: 2, arrivalTime: 6 },
]

export default function PizzaScheduler() {
  const [pizzas, setPizzas] = useState<Pizza[]>(initialPizzas)
  const [newPizza, setNewPizza] = useState<Omit<Pizza, "id">>({
    name: "",
    cookingTime: 10,
    deliveryDistance: 5,
    priority: 2,
    arrivalTime: 0,
  })
  const [cookingResults, setCookingResults] = useState<SchedulingResult | null>(null)
  const [deliveryResults, setDeliveryResults] = useState<SchedulingResult | null>(null)
  const [cookingAlgorithm, setCookingAlgorithm] = useState("fcfs")
  const [deliveryAlgorithm, setDeliveryAlgorithm] = useState("fcfs")
  const [timeQuantum, setTimeQuantum] = useState(4)
  const [combinedAlgorithm, setCombinedAlgorithm] = useState(false)

  const addPizza = () => {
    if (newPizza.name.trim() === "") return

    setPizzas([
      ...pizzas,
      {
        ...newPizza,
        id: Math.max(0, ...pizzas.map((p) => p.id)) + 1,
      },
    ])

    setNewPizza({
      name: "",
      cookingTime: 10,
      deliveryDistance: 5,
      priority: 2,
      arrivalTime: 0,
    })
  }

  const removePizza = (id: number) => {
    setPizzas(pizzas.filter((pizza) => pizza.id !== id))
  }

  const runSimulation = () => {
    // For cooking phase
    const cookingOrders: PizzaOrder[] = pizzas.map((pizza) => ({
      id: pizza.id,
      name: pizza.name,
      processTime: pizza.cookingTime,
      priority: pizza.priority,
      arrivalTime: pizza.arrivalTime,
    }))

    // For delivery phase
    const deliveryOrders: PizzaOrder[] = pizzas.map((pizza) => ({
      id: pizza.id,
      name: pizza.name,
      processTime: pizza.deliveryDistance,
      priority: pizza.priority,
      // Arrival time for delivery is the completion time from cooking
      arrivalTime: pizza.arrivalTime + pizza.cookingTime,
    }))

    // Get cooking results
    const cookingResult = schedulePizzas(cookingOrders, combinedAlgorithm ? "combined" : cookingAlgorithm, timeQuantum)
    setCookingResults(cookingResult)

    // Get delivery results
    const deliveryResult = schedulePizzas(
      deliveryOrders,
      combinedAlgorithm ? "combined" : deliveryAlgorithm,
      timeQuantum,
    )
    setDeliveryResults(deliveryResult)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PizzaIcon className="mr-2 h-6 w-6 text-red-500" />
            Pizza Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Current Orders</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto p-2">
                {pizzas.map((pizza) => (
                  <div key={pizza.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium">{pizza.name}</span>
                      <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:gap-2">
                        <span className="flex items-center">
                          <ClockIcon className="h-3 w-3 mr-1" /> Cook: {pizza.cookingTime}min
                        </span>
                        <span className="flex items-center">
                          <TruckIcon className="h-3 w-3 mr-1" /> Dist: {pizza.deliveryDistance}km
                        </span>
                        <span>Priority: {pizza.priority}</span>
                        <span>Arrival: {pizza.arrivalTime}min</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePizza(pizza.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Add New Order</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pizza-name">Pizza Name</Label>
                    <Input
                      id="pizza-name"
                      value={newPizza.name}
                      onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
                      placeholder="e.g., Margherita"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrival-time">Arrival Time (min)</Label>
                    <Input
                      id="arrival-time"
                      type="number"
                      min="0"
                      value={newPizza.arrivalTime}
                      onChange={(e) => setNewPizza({ ...newPizza, arrivalTime: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cooking Time: {newPizza.cookingTime} minutes</Label>
                  <Slider
                    value={[newPizza.cookingTime]}
                    min={5}
                    max={30}
                    step={1}
                    onValueChange={(value) => setNewPizza({ ...newPizza, cookingTime: value[0] })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Delivery Distance: {newPizza.deliveryDistance} km</Label>
                  <Slider
                    value={[newPizza.deliveryDistance]}
                    min={1}
                    max={15}
                    step={1}
                    onValueChange={(value) => setNewPizza({ ...newPizza, deliveryDistance: value[0] })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Priority (1-5)</Label>
                  <Slider
                    value={[newPizza.priority]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => setNewPizza({ ...newPizza, priority: value[0] })}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                <Button onClick={addPizza} className="w-full">
                  <PlusIcon className="mr-2 h-4 w-4" /> Add Pizza
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduling Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cooking-algorithm">Cooking Algorithm</Label>
                <Select value={cookingAlgorithm} onValueChange={setCookingAlgorithm} disabled={combinedAlgorithm}>
                  <SelectTrigger id="cooking-algorithm">
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fcfs">First Come First Served (FCFS)</SelectItem>
                    <SelectItem value="sjf">Shortest Job First (SJF)</SelectItem>
                    <SelectItem value="priority">Priority Scheduling</SelectItem>
                    <SelectItem value="round-robin">Round Robin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery-algorithm">Delivery Algorithm</Label>
                <Select value={deliveryAlgorithm} onValueChange={setDeliveryAlgorithm} disabled={combinedAlgorithm}>
                  <SelectTrigger id="delivery-algorithm">
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fcfs">First Come First Served (FCFS)</SelectItem>
                    <SelectItem value="sjf">Shortest Job First (SJF)</SelectItem>
                    <SelectItem value="priority">Priority Scheduling</SelectItem>
                    <SelectItem value="round-robin">Round Robin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(cookingAlgorithm === "round-robin" || deliveryAlgorithm === "round-robin" || combinedAlgorithm) && (
                <div className="space-y-2">
                  <Label>Time Quantum: {timeQuantum} minutes</Label>
                  <Slider
                    value={[timeQuantum]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => setTimeQuantum(value[0])}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="combined-algorithm"
                  checked={combinedAlgorithm}
                  onChange={(e) => setCombinedAlgorithm(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <Label htmlFor="combined-algorithm">Use Combined Algorithm (SJF + Priority)</Label>
              </div>

              <div className="p-4 bg-amber-50 rounded-md border border-amber-200">
                <h4 className="font-medium text-amber-800 mb-2">Combined Algorithm</h4>
                <p className="text-sm text-amber-700">
                  This hybrid algorithm combines Shortest Job First with Priority scheduling. It calculates a score
                  based on both process time and priority, giving you the benefits of both algorithms.
                </p>
              </div>

              <Button onClick={runSimulation} className="w-full bg-red-600 hover:bg-red-700 mt-4">
                Run Simulation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {(cookingResults || deliveryResults) && (
        <Tabs defaultValue="cooking" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cooking">Cooking Process</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Process</TabsTrigger>
          </TabsList>

          <TabsContent value="cooking">
            {cookingResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClockIcon className="mr-2 h-5 w-5" />
                    Cooking Schedule Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <GanttChart data={cookingResults.ganttChart} />
                    <MetricsDisplay results={cookingResults} />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="delivery">
            {deliveryResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TruckIcon className="mr-2 h-5 w-5" />
                    Delivery Schedule Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <GanttChart data={deliveryResults.ganttChart} />
                    <MetricsDisplay results={deliveryResults} />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}


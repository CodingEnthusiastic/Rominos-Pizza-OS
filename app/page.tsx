import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PizzaScheduler from "@/components/pizza-scheduler"
import AlgorithmExplanation from "@/components/algorithm-explanation"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">Rominus Pizza Scheduling System</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A demonstration of CPU scheduling algorithms applied to pizza cooking and delivery processes.
          </p>
        </div>

        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simulator">Scheduling Simulator</TabsTrigger>
            <TabsTrigger value="explanation">Algorithm Explanations</TabsTrigger>
          </TabsList>
          <TabsContent value="simulator">
            <PizzaScheduler />
          </TabsContent>
          <TabsContent value="explanation">
            <AlgorithmExplanation />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}


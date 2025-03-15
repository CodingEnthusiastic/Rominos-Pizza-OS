import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AlgorithmExplanation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CPU Scheduling Algorithms for Pizza Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This application demonstrates how CPU scheduling algorithms can be applied to a pizza delivery system. Below
            are explanations of each algorithm and how they work in this context.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="fcfs">
              <AccordionTrigger>First-Come-First-Served (FCFS)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    In a pizza delivery system, the First-Come-First-Served (FCFS) scheduling algorithm processes orders
                    exactly in the sequence they arrive.
                  </p>

                  <h4 className="font-medium">How it works:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Orders are placed in a queue as they come in</li>
                    <li>The kitchen prepares pizzas in the exact order they were received</li>
                    <li>Delivery drivers take pizzas to customers in the same order</li>
                    <li>No order is prioritized over another regardless of cooking time or delivery distance</li>
                  </ul>

                  <h4 className="font-medium">Advantages:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Simple to implement and understand</li>
                    <li>Fair in the sense that all orders are processed in arrival order</li>
                    <li>No starvation - every order will eventually be processed</li>
                  </ul>

                  <h4 className="font-medium">Disadvantages:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Can lead to the "convoy effect" where a time-consuming order holds up all subsequent orders</li>
                    <li>Average waiting time can be high if complex orders arrive early</li>
                    <li>Not optimal for customer satisfaction when order complexity varies significantly</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="sjf">
              <AccordionTrigger>Shortest Job First (SJF)</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    In a pizza delivery system, the Shortest Job First (SJF) scheduling algorithm prioritizes orders
                    based on their preparation time or delivery distance.
                  </p>

                  <h4 className="font-medium">How it works:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>For cooking: Pizzas with the shortest preparation time are made first</li>
                    <li>For delivery: Orders with the shortest delivery distance are delivered first</li>
                    <li>The system continuously selects the "shortest" remaining job</li>
                  </ul>

                  <h4 className="font-medium">Advantages:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Minimizes average waiting time across all orders</li>
                    <li>Maximizes throughput (number of orders completed per time unit)</li>
                    <li>Quick orders don't get stuck behind time-consuming ones</li>
                  </ul>

                  <h4 className="font-medium">Disadvantages:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Potential starvation of complex orders during busy periods</li>
                    <li>Requires knowing or estimating preparation time in advance</li>
                    <li>Not necessarily fair to customers who ordered first</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rr">
              <AccordionTrigger>Round Robin</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    In a pizza delivery system, the Round Robin scheduling algorithm ensures that each order gets a fair
                    share of processing time by cycling through all orders.
                  </p>

                  <h4 className="font-medium">How it works:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Each order gets a fixed time slice (time quantum) of attention</li>
                    <li>
                      For cooking: The chef works on each pizza for a set amount of time before moving to the next
                    </li>
                    <li>For delivery: Drivers take turns delivering different orders in rotation</li>
                    <li>If an order isn't completed in its time slice, it goes back in the queue</li>
                  </ul>

                  <h4 className="font-medium">Advantages:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Fair distribution of resources among all orders</li>
                    <li>Prevents any single order from monopolizing the system</li>
                    <li>Good for handling multiple orders of varying complexity</li>
                  </ul>

                  <h4 className="font-medium">Disadvantages:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Context switching overhead (changing tasks frequently)</li>
                    <li>Not optimal for overall throughput</li>
                    <li>
                      Time quantum selection is critical - too short causes excessive switching, too long approaches
                      FCFS
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="priority">
              <AccordionTrigger>Priority Scheduling</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    In a pizza delivery system, Priority scheduling allows certain orders to be processed before others
                    based on their importance or urgency.
                  </p>

                  <h4 className="font-medium">How it works:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Each order is assigned a priority value (higher number = higher priority)</li>
                    <li>Orders with higher priority are processed before those with lower priority</li>
                    <li>Priority can be based on customer status (VIP), order value, or special circumstances</li>
                    <li>Among orders with equal priority, FCFS is typically used</li>
                  </ul>

                  <h4 className="font-medium">Advantages:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Important customers or urgent orders get faster service</li>
                    <li>Allows business priorities to be reflected in operations</li>
                    <li>Can improve customer satisfaction for high-value clients</li>
                  </ul>

                  <h4 className="font-medium">Disadvantages:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Potential starvation of low-priority orders during busy periods</li>
                    <li>Regular customers might experience longer wait times</li>
                    <li>Requires a clear priority assignment policy</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="combined">
              <AccordionTrigger>Combined Algorithms</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>
                    Combined algorithms merge the benefits of multiple scheduling approaches to create more efficient
                    systems.
                  </p>

                  <h4 className="font-medium">SJF + Priority Combination:</h4>
                  <p>This hybrid approach considers both the processing time and the priority of each order:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      A composite score is calculated for each order based on both its processing time and priority
                    </li>
                    <li>Orders with better scores (shorter jobs with higher priority) are processed first</li>
                    <li>The formula might weight priority and processing time differently based on business needs</li>
                  </ul>

                  <h4 className="font-medium">Other Possible Combinations:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Priority + Round Robin:</strong> High-priority orders get more time slices
                    </li>
                    <li>
                      <strong>FCFS + Priority:</strong> Orders are grouped by priority, then processed in arrival order
                      within each group
                    </li>
                    <li>
                      <strong>Multilevel Queue:</strong> Different algorithms for different types of orders
                    </li>
                  </ul>

                  <h4 className="font-medium">Benefits of Combined Approaches:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>More flexible and adaptable to real-world scenarios</li>
                    <li>Can balance multiple competing objectives (fairness, throughput, priority)</li>
                    <li>Mitigates the disadvantages of individual algorithms</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="best-scenarios">
              <AccordionTrigger>Best Algorithm for Different Scenarios</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <h4 className="font-medium">For Cooking Process:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>During slow periods:</strong> FCFS is simple and fair
                    </li>
                    <li>
                      <strong>During rush hours:</strong> SJF maximizes throughput
                    </li>
                    <li>
                      <strong>With mixed order types:</strong> Round Robin ensures all orders progress
                    </li>
                    <li>
                      <strong>With VIP customers:</strong> Priority scheduling ensures important customers are served
                      first
                    </li>
                  </ul>

                  <h4 className="font-medium">For Delivery Process:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Urban deliveries:</strong> SJF based on distance minimizes driver idle time
                    </li>
                    <li>
                      <strong>Mixed delivery areas:</strong> Combined SJF+Priority balances distance and importance
                    </li>
                    <li>
                      <strong>Limited drivers:</strong> Round Robin ensures all areas get service
                    </li>
                  </ul>

                  <h4 className="font-medium">Optimal Combined Solution:</h4>
                  <p>For a real pizza delivery business, a multilevel approach often works best:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Group orders by priority (VIP, regular, etc.)</li>
                    <li>Within each priority group, use SJF for cooking to maximize throughput</li>
                    <li>For delivery, use a distance-based algorithm that groups deliveries by area</li>
                    <li>Implement aging to prevent starvation of any orders</li>
                  </ol>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}


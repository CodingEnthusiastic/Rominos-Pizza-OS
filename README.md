# 🍕 Pizza Scheduling System

## 🎯 Project Description
Rominus Pizza aims to implement a **Pizza Scheduling System** by simulating different **CPU scheduling algorithms** to efficiently manage pizza deliveries.

### ✅ Deployed Website
[Visit the Deployed Website](https://rominospizza.netlify.app/)

### 📂 Project Link
[Look for files](https://github.com/CodingEnthusiastic/Rominos-Pizza-OS)

---

## 🚀 Scheduling Algorithms Implemented

### 1️⃣ **FCFS (First Come First Serve)**
In the pizza delivery system, the FCFS scheduling algorithm ensures that pizzas are delivered in the exact order in which orders are placed. The driver delivers the pizzas sequentially, regardless of preparation time or priority.

### 2️⃣ **SJF (Shortest Job First)**
SJF scheduling prioritizes pizza deliveries based on the shortest preparation time. This minimizes the average delivery time by handling quick orders first.

### 3️⃣ **Round Robin**
In the Round Robin approach, each delivery driver is assigned an equal time slice to deliver pizzas. This ensures fairness and prevents any driver from being overloaded.

### 4️⃣ **Priority Scheduling**
In this algorithm, pizzas are prioritized based on urgency, such as VIP customer orders or emergency deliveries. Higher-priority orders are delivered first, while others wait in the queue.

---

## 🔍 Optimal Algorithm for Rominus Pizza
The best scheduling algorithm depends on the current scenario:
- **FCFS** is suitable during off-peak hours when the order load is low.
- **SJF** helps during peak hours by delivering quick orders first, reducing average delivery time.
- **Round Robin** is ideal when multiple drivers are available to balance the load.
- **Priority Scheduling** ensures urgent deliveries are handled first.

### 🛠️ Hybrid Approach
Combining **SJF for preparation time** and **Priority Scheduling for urgent orders** can enhance efficiency. By assigning high-priority orders to VIP customers and using SJF for normal orders, the system can minimize delay and improve customer satisfaction.

---

## 🛤️ Installation and Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/rishabhshenoy/pizza-scheduling-system.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the project:
   ```bash
   npm start
   ```

---

## 📧 Contact
For queries and collaborations, reach out to **Rominus Pizza Team** at rishabh10d58@gmail.com.

---

## 🎯 Conclusion
By implementing multiple scheduling algorithms and combining them for efficiency, Rominus Pizza can optimize the delivery process, improve customer satisfaction, and reduce delivery time.

Any suggestions are welcomed

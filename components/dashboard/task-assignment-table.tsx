import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, AlertCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TaskAssignmentTableProps {
  status: "active" | "completed" | "upcoming"
}

export function TaskAssignmentTable({ status }: TaskAssignmentTableProps) {
  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (status === "active") return task.status === "In Progress" || task.status === "On Route"
    if (status === "completed") return task.status === "Completed"
    if (status === "upcoming") return task.status === "Scheduled"
    return true
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No tasks found.
              </TableCell>
            </TableRow>
          ) : (
            filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div className="font-medium">{task.customer}</div>
                  <div className="text-xs text-muted-foreground">{task.address}</div>
                </TableCell>
                <TableCell>{task.serviceType}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={task.technicianAvatar || "/placeholder.svg"} alt={task.technician} />
                      <AvatarFallback>{task.technician.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{task.technician}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{task.time}</div>
                  {task.estimatedDuration && (
                    <div className="text-xs text-muted-foreground">~{task.estimatedDuration} min</div>
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={task.priority} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Contact customer</DropdownMenuItem>
                      <DropdownMenuItem>Contact technician</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Reassign task</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Cancel service</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Completed":
      return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
    case "In Progress":
      return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
    case "On Route":
      return (
        <Badge variant="outline" className="text-yellow-500 border-yellow-500">
          On Route
        </Badge>
      )
    case "Scheduled":
      return (
        <Badge variant="outline" className="text-purple-500 border-purple-500">
          Scheduled
        </Badge>
      )
    case "Delayed":
      return (
        <Badge variant="outline" className="text-red-500 border-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> Delayed
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function PriorityBadge({ priority }: { priority: string }) {
  switch (priority) {
    case "High":
      return <Badge variant="destructive">High</Badge>
    case "Medium":
      return <Badge variant="secondary">Medium</Badge>
    case "Low":
      return <Badge variant="outline">Low</Badge>
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

const tasks = [
  {
    id: "1",
    customer: "John Smith",
    address: "123 Main St, Apt 4B",
    serviceType: "Plumbing Repair",
    technician: "Robert Johnson",
    technicianAvatar: "/placeholder.svg?height=32&width=32",
    time: "10:30 AM",
    estimatedDuration: "45",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "2",
    customer: "Sarah Johnson",
    address: "456 Oak Ave",
    serviceType: "Electrical Installation",
    technician: "Jane Smith",
    technicianAvatar: "/placeholder.svg?height=32&width=32",
    time: "11:15 AM",
    estimatedDuration: "60",
    status: "On Route",
    priority: "Medium",
  },
  {
    id: "3",
    customer: "Michael Brown",
    address: "789 Pine Rd",
    serviceType: "HVAC Maintenance",
    technician: "Emily Davis",
    technicianAvatar: "/placeholder.svg?height=32&width=32",
    time: "9:00 AM",
    estimatedDuration: "90",
    status: "Completed",
    priority: "Medium",
  },
  {
    id: "4",
    customer: "Emily Davis",
    address: "321 Elm St",
    serviceType: "Cleaning Service",
    technician: "Michael Wilson",
    technicianAvatar: "/placeholder.svg?height=32&width=32",
    time: "1:30 PM",
    estimatedDuration: "120",
    status: "Scheduled",
    priority: "Low",
  },
  {
    id: "5",
    customer: "David Wilson",
    address: "654 Maple Dr",
    serviceType: "Appliance Repair",
    technician: "Sarah Thompson",
    technicianAvatar: "/placeholder.svg?height=32&width=32",
    time: "3:45 PM",
    estimatedDuration: "60",
    status: "Scheduled",
    priority: "High",
  },
  {
    id: "6",
    customer: "Jennifer Lee",
    address: "987 Cedar Ln",
    serviceType: "Plumbing Inspection",
    technician: "Robert Johnson",
    technicianAvatar: "/placeholder.svg?height=32&width=32",
    time: "2:15 PM",
    estimatedDuration: "30",
    status: "Delayed",
    priority: "Medium",
  },
]

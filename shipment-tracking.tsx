"use client"
import { CalendarClock, Check, Clock, Package, FileSignature, BadgeCheck, ShieldAlert } from "lucide-react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { SupportChat } from "./components/support-chat"

export default function ShipmentTracking() {
  // Shipment dates
  const orderPlacementDate = new Date("2024-11-22")
  const estimatedDeliveryDate = new Date("2025-08-29")
  const currentDate = new Date()

  // Calculate progress percentage
  const totalDuration = estimatedDeliveryDate.getTime() - orderPlacementDate.getTime()
  const elapsedDuration = currentDate.getTime() - orderPlacementDate.getTime()
  const progressPercentage = Math.min(Math.max(Math.floor((elapsedDuration / totalDuration) * 100), 0), 100)

  // Calculate weeks and days
  const elapsedWeeks = Math.floor(elapsedDuration / (7 * 24 * 60 * 60 * 1000))
  const remainingDays = Math.ceil((estimatedDeliveryDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000))

  // Timeline events
  const timelineEvents = [
    {
      id: 1,
      title: "Order Placed",
      details: "Your Cinghialino has been confirmed",
      date: format(orderPlacementDate, "MMMM dd, yyyy"),
      icon: <Check className="h-4 w-4" />,
      status: "completed",
    },
    {
      id: 2,
      title: "Dispatched",
      details: "Your Cinghialino is packed and ready to travel",
      date: "December 11, 2024",
      icon: <Package className="h-4 w-4" />,
      status: "completed",
    },
    {
      id: 3,
      title: "Customs declaration",
      details: "Your Cinghialino has passed the first border controls. Sanity checks completed successfully.",
      date: "January 14, 2025",
      icon: <ShieldAlert className="h-4 w-4" />,
      status: "completed",
    },
    {
      id: 4,
      title: "Further checks",
      details: "Waiting for more details from the customs office",
      date: "April 14, 2025",
      icon: <FileSignature className="h-4 w-4" />,
      status: "in-progress",
    },
    {
      id: 5,
      title: "In Transit",
      details: "Your Cinghialino is on its way to you",
      date: "",
      icon: <Clock className="h-4 w-4" />,
      status: "pending",
    },
    {
      id: 6,
      title: "Delivery",
      details: "Your Cinghialino will arrive soon",
      date: "August 20, 2025",
      icon: <CalendarClock className="h-4 w-4" />,
      status: "pending",
    },
  ]

  return (
    <div className="container mx-auto max-w-md px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🐗</span>
        <h1 className="text-2xl font-bold">Cinghialines</h1>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Delivery Tracking</CardTitle>
          <CardDescription>Track your Cinghialino in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Tracking Progress</span>
              <Badge variant="outline">{progressPercentage}%</Badge>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{format(orderPlacementDate, "MMM d, yyyy")}</span>
              <span>{format(estimatedDeliveryDate, "MMM d, yyyy")}</span>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-primary">{elapsedWeeks}</span>
                <span className="text-muted-foreground">weeks elapsed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-primary">{remainingDays}</span>
                <span className="text-muted-foreground">days remaining</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-sm font-medium">Tracking Details</h3>
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative">
                  <div className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full border",
                          event.status === "completed"
                            ? "border-primary bg-primary text-primary-foreground"
                            : event.status === "in-progress"
                              ? "border-primary text-primary"
                              : "border-muted-foreground/20 text-muted-foreground/60",
                        )}
                      >
                        {event.icon}
                      </div>
                      {index < timelineEvents.length - 1 && (
                        <div
                          className={cn(
                            "absolute top-8 h-full w-0.5",
                            event.status === "completed"
                              ? "bg-primary"
                              : event.status === "in-progress"
                                ? "bg-gradient-to-b from-primary to-muted-foreground/20"
                                : "bg-muted-foreground/20",
                          )}
                        />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="text-sm font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.details}</div>
                      <div className="text-xs text-muted-foreground mt-1">{event.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tracking Number</span>
              <span className="text-sm font-medium">CL-24587963</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Service</span>
              <span className="text-sm font-medium">Standard Shipping</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Package Weight</span>
              <span className="text-sm font-medium">3.5 kg</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <SupportChat />
    </div>
  )
}


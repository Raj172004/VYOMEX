"use client";

import ActivityItem from "./ActivityItem";

const activities = [
  {
    title: "Website Published",
    description: "Corporate Website",
    time: "1m",
  },
  {
    title: "Invoice Paid",
    description: "₹18,000 received",
    time: "5m",
  },
  {
    title: "New Client",
    description: "Enterprise onboarding",
    time: "11m",
  },
  {
    title: "SEO Report",
    description: "Monthly analytics",
    time: "20m",
  },
];

export default function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.title}
          {...activity}
        />
      ))}
    </div>
  );
}
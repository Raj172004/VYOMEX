"use client";

import NotificationCard from "./NotificationCard";

const notifications = [
  {
    title: "New Website Project",
    subtitle: "Enterprise Client",
    amount: "+₹48K",
  },
  {
    title: "Invoice Paid",
    subtitle: "Payment Received",
    amount: "+₹18K",
  },
  {
    title: "Deployment Completed",
    subtitle: "Production Server",
  },
];

export default function NotificationStack() {
  return (
    <div className="pointer-events-none absolute -right-28 top-24 hidden 2xl:flex flex-col gap-5">
      {notifications.map((item, index) => (
        <NotificationCard
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          amount={item.amount}
          delay={index * 0.2}
        />
      ))}
    </div>
  );
}
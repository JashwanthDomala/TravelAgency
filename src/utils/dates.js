export const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return formatDate(d);
};

export const getMinStartDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return formatDate(d);
};

export const parseTripDurationDays = (durationStr = "5") => {
  const matches = String(durationStr).match(/\d+/g);
  if (!matches?.length) return 5;
  const nums = matches.map(Number);
  return Math.max(...nums);
};

export const buildTripDates = (startDate, durationDays = 5) => {
  const nights = Math.max(1, durationDays);
  return {
    startDate,
    checkIn: startDate,
    checkOut: addDays(startDate, nights),
    departure: startDate,
    returnDate: addDays(startDate, nights),
    nights,
  };
};

export const getDefaultTripDates = (durationDays = 5) => {
  const start = new Date();
  start.setDate(start.getDate() + 14);
  return buildTripDates(formatDate(start), durationDays);
};

export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const TAX_RATE = 0.12;
const SERVICE_FEE = 1500;

export const calculateTripPricing = ({
  hotelNightly = 0,
  nights = 5,
  flightPrice = 0,
  activitiesTotal = 0,
  travelers = 2,
}) => {
  const hotelTotal = hotelNightly * nights;
  const flightsTotal = flightPrice * travelers;
  const activities = activitiesTotal * travelers;
  const subtotal = hotelTotal + flightsTotal + activities;
  const taxes = Math.round(subtotal * TAX_RATE);
  const serviceFee = SERVICE_FEE;
  const total = subtotal + taxes + serviceFee;

  return {
    hotelTotal,
    flightsTotal,
    activities,
    subtotal,
    taxes,
    serviceFee,
    total,
    breakdown: [
      { label: "Hotel", amount: hotelTotal },
      { label: "Flights", amount: flightsTotal },
      { label: "Activities", amount: activities },
      { label: "Taxes (12%)", amount: taxes },
      { label: "Service fee", amount: serviceFee },
    ],
  };
};

export const getHotelNightly = (hotel) =>
  hotel?.rate_per_night?.extracted_lowest ??
  hotel?.rate_per_night?.before_taxes_fees ??
  hotel?.price ??
  5000;

export const getFlightPrice = (flight) =>
  flight?.price ?? flight?.total_price ?? 8000;

export const AIRPORT_CODES = {
  DEL: "DEL",
  BOM: "BOM",
  BLR: "BLR",
  HYD: "HYD",
  MAA: "MAA",
  CCU: "CCU",
  GOI: "GOI",
  SXR: "SXR",
  IXL: "IXL",
  COK: "COK",
  JAI: "JAI",
  KUU: "KUU",
  DED: "DED",
};

export const DEFAULT_ORIGIN = "DEL";

export const getAirportForDestination = (destination) =>
  destination?.airportCode || "DEL";

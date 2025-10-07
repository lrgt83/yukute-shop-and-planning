export const buildFilterParams = (filters = []) =>
  filters
    .map((filter) => `${filter.filterField}=${filter.filterValue}&`)
    .join("");

export const parseJWT = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1; // Months are 0-indexed, so add 1
  let day = today.getDate();

  // Add leading zero if month or day is a single digit
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const formatDateTimeFromUtcDate = (dateString) => {
  // const date = new Date(dateString);
  // // Option 1: Convert to local time and format as a locale-specific string
  // console.log(date.toLocaleString()); // e.g., "10/5/2025, 1:00:00 PM" (in a US Pacific timezone)
  // return date.toLocaleString();

  // if (!dateString) return "";

  // const date = new Date(dateString);

  // return new Intl.DateTimeFormat("en-US", {
  //   hour: "numeric",
  //   minute: "2-digit",
  //   hour12: true,
  // }).format(date);

  if (!dateString) return "";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("es-GT", {
    dateStyle: "short", // e.g. "5 de octubre de 2025"
    timeStyle: "short", // e.g. "2:35 p. m."
    hour12: true,
  }).format(date);
};

export const formatCurrency = (value, withSymbol = false) => {
  if (!value) return withSymbol ? "Q 0.00" : "0.00";

  const number = parseFloat(value);

  return new Intl.NumberFormat("es-GT", {
    style: withSymbol ? "currency" : "decimal",
    currency: "GTQ",
    minimumFractionDigits: 2,
  }).format(number);
};

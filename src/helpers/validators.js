import moment from "react-moment";

const UI_DATE_FORMAT = "D/M/YYYY";

const DIGITS_EXPRESSION = /^[0-9]+(\.[0-9]+)*$/;
const INTEGER_EXPRESSION = /^[0-9]+$/;

export const isDecimal = (value) => DIGITS_EXPRESSION.test(value);
export const isInteger = (value) => INTEGER_EXPRESSION.test(value);
export const isValidUIDate = (date) =>
  moment(date, UI_DATE_FORMAT, true).isValid();

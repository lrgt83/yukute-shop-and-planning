import moment from "moment";

export const formatDateForBackend = (date) => {
  if (!date) {
    return "";
  }
  return moment(date, "D/M/YYYY").format("YYYY-MM-DD");
};

export const formatDateForFrontend = (date) => {
  if (!date) {
    return "";
  }
  return moment(date, "YYYY-MM-DD").format("D/M/YYYY");
};

export const formatTimestamp = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  return moment(timestamp, "YYYY-MM-DDTHH:mm:ss").format("D/M/YYYY HH:mm:ss");
};

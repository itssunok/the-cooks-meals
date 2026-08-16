const WEEKDAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function getTodayKey() {
  return WEEKDAY_NAMES[new Date().getDay()];
}

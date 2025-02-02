export const formatLongDate = (date: Date) => {
  const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return dateTimeFormat.format(date);
};
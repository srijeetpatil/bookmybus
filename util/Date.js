const dateConverter = (date) => {
  let month;
  let year = date.substring(0, 4);
  date = date.split(year + "-")[1];
  month = date.substring(0, 2);
  if (month === "01") month = "Jan";
  else if (month === "02") month = "Feb";
  else if (month === "03") month = "Mar";
  else if (month === "04") month = "Apr";
  else if (month === "05") month = "May";
  else if (month === "06") month = "Jun";
  else if (month === "07") month = "Jul";
  else if (month === "08") month = "Aug";
  else if (month === "09") month = "Sept";
  else if (month === "10") month = "Oct";
  else if (month === "11") month = "Nov";
  else if (month === "12") month = "Dec";
  date = date.split("T")[0];
  date = date.split("-")[1];
  return date + " " + month + " " + year;
};

export default dateConverter;

//2021-04-24T15:58:50.049Z

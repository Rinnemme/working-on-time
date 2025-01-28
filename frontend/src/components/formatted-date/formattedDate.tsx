interface formattedDateProps {
  date: string;
  className?: string;
}

export default function FormattedDate({
  date,
  className = "",
}: formattedDateProps) {
  function getMonth(str: string) {
    switch (str.slice(5, 7)) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
    }
  }

  const year =
    +date.slice(0, 4) === new Date().getFullYear() ? null : date.slice(0, 4);
  const month = getMonth(date);
  const day = date.slice(8).startsWith("0") ? date.slice(9) : date.slice(8);

  return (
    <div className={className}>
      {year ? `${month} ${day}, ${year}` : `${month} ${day}`}
    </div>
  );
}

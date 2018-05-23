export function validDate(month, day): boolean {
  let shortMonths = [4, 6, 9, 11];
  if (month == null || day == null)
    return true;
  if (month < 1 || month > 12 || day < 1 || day > 31)
    return false;
  if (shortMonths.find(n => n == month))
    return (day <= 30);
  else if (month == 2)
    return (day <= 29);
  else
    return true;
}

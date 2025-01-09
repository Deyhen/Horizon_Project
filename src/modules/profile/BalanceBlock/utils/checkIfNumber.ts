export function checkIfNumber(value: string) {
  if (value === '' || (/^\d+(\.\d{0,1})?$/.test(value) && value.length < 8)) {
    return true;
  }
  return false;
}

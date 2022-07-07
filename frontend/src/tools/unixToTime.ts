export function padTo2Digits(num: number): string {
  return num.toString().padStart(2, "0");
}

export const fromUnixMiliseconds = (unixMil: string) => {
  const time = new Date(parseInt(unixMil));
  //console.log(time.getHours());
  const timeStr: string = `${padTo2Digits(time.getHours())}:${padTo2Digits(
    time.getMinutes()
  )}:${padTo2Digits(time.getSeconds())}`;
  return timeStr;
};

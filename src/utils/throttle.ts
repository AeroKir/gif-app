function throttle(mainFunction: (...args: any[]) => void, delay: number): (...args: any[]) => void {
  let timerFlag: NodeJS.Timeout | null = null;

  return (...args: any[]): void => {
    if (timerFlag === null) {
      mainFunction(...args);
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
}

export default throttle;

function debounce(mainFunction: (...args: any[]) => void, delay: number): (...args: any[]) => void {
  let timer: ReturnType<typeof setTimeout> | null;

  return function (...args: any[]): void {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
}

export default debounce;

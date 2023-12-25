export default function range(start = 1, stop = 15, step = 1) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_value, index) => start + index * step,
  );
}

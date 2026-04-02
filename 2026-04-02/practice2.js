import { useState } from 'react';

/**
 * @param number initialValue
 * @return Object
 */
export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  return {
    count,
    increment: () => setCount((x) => x + 1),
    decrement: () => setCount((x) => x - 1),
    reset: () => setCount(initialValue),
    setCount,
  }
}
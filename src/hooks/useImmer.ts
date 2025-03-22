import { useCallback, useState } from 'react';
import { produce, Draft, freeze } from 'immer';

type DraftFunction<S> = (draft: Draft<S>) => void;
type Updater<S> = (arg: S | DraftFunction<S>) => void;
type ImmerHook<S> = [S, Updater<S>];

export function useImmer<S>(initialValue: S | (() => S)): ImmerHook<S>;
export function useImmer<T>(initialValue: T) {
  const [value, setValue] = useState(() =>
    freeze(typeof initialValue === 'function' ? initialValue() : initialValue)
  );

  return [
    value,
    useCallback((updater: T | DraftFunction<T>) => {
      if (typeof updater === 'function') {
        setValue(produce(updater as DraftFunction<T>));
      } else {
        freeze(typeof initialValue === 'function' ? initialValue() : initialValue);
        setValue(freeze(updater));
      }
    }, []),
  ];
}

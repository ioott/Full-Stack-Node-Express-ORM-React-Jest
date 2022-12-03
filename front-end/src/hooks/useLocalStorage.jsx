import { useState, useEffect, useRef } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [savedValue, setSavedValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const keyRef = useRef(key);
  const initialValueRef = useRef(initialValue);

  useEffect(() => {
    const savedItem = localStorage.getItem(keyRef.current);
    if (savedItem === null) {
      localStorage.setItem(keyRef.current, JSON.stringify(initialValueRef.current));
      setSavedValue(initialValueRef.current);
    } else {
      setSavedValue(JSON.parse(savedItem));
    }
  }, []);

  useEffect(() => {
    const savedItem = window.localStorage.getItem(keyRef.current);
    if (newValue !== savedItem && (newValue !== '' && newValue !== null)) {
      localStorage.setItem(keyRef.current, JSON.stringify(newValue));
      setSavedValue(newValue);
    }
  }, [newValue, keyRef]);

  return [savedValue, setNewValue];
}

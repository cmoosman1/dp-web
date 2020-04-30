import { useState, useEffect } from "react";

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function handleChange({ target }) {
    setValue(target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}

import { useState } from 'react';
import { powerform } from 'powerform';

function usePowerform(schema, options = {}) {
  const [dform] = useState(powerform(schema, options));
  const fields = dform.fieldNames;

  const setters = fields.reduce((a, field) => {
    const [, setData] = useState(dform[field].getData()); //eslint-disable-line
    const [, setError] = useState(dform[field].getError()); //eslint-disable-line
    a[field] = { setData, setError };
    return a;
  }, {});

  if (!dform.__mounted) {
    dform.__mounted = true;
    const originalOnChange = dform.config.onChange;
    const originalOnError = dform.config.onError;

    dform.config.onChange = (data, f) => {
      originalOnChange && originalOnChange.call(dform, data, f);
      fields.forEach(field => {
        setters[field].setData(dform[field].getData());
      });
    };

    dform.config.onError = (error, f) => {
      originalOnError && originalOnError.call(dform, error, f);
      fields.forEach(field => {
        setters[field].setError(dform[field].getError());
      });
    };
  }

  return dform;
}

export default usePowerform

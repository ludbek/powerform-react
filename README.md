# powerform-react
A React hook for [powerform](https://github.com/ludbek/powerform)

## [Demo](https://codesandbox.io/s/powerform-react-17gqu)

## Syntax
```javascript
usePowerform(schema, options?)
```
### schema
Its a schema that is passed to [powerform](https://github.com/ludbek/powerform).

### options
Its a option that is passed to [powerform](https://github.com/ludbek/powerform).

## Usage
```javascript
import React from "react";
import usePowerform from "powerform-react";
import "./styles.css";

function required(value) {
  if (!value) {
    return "This field is required.";
  }
}

function isPassword(value) {
  if (value.length < 8) {
    return "Password must be at least 8 characters long.";
  }
}

const schema = {
  email: required,
  password: [required, isPassword]
};

function submit(form) {
  return e => {
    e.preventDefault();
    form.validate();
  };
}

export default function App() {
  const form = usePowerform(schema);
  return (
    <div>
      <div className="label">Email</div>
      <input
        onInput={e => form.email.setData(e.target.value)}
        onChange={() => form.email.validate()}
      />
      <div className="error">{form.email.getError()}</div>
      <div className="label">Password</div>
      <input
        onInput={e => form.password.setData(e.target.value)}
        onChange={() => form.password.validate()}
      />
      <div className="error">{form.password.getError()}</div>
      <button onClick={submit(form)}>Login</button>
    </div>
  );
}
```

Checkout above example [here](https://codesandbox.io/s/pwerform-react-simple-example-jjcbu?file=/src/App.js).

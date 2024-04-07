import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USE_PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "USE_PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const collageReducer = (state, action) => {
  if (action.type === "USER_COLLAGE") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "USER_COLLAGE_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};



const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollage, setEnteredCollage] = useState("");
  // const [collageIsValid, setCollageIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [collageState, dispatchCollage] = useReducer(collageReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: collageIsValid } = collageState;

  useEffect(() => {
    console.log("i am in login");
    const magicDelay = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid && collageIsValid > 0);
    }, 500);
    return () => {
      clearTimeout(magicDelay);
      console.log("inside cleanup");
    };
  }, [emailIsValid, passwordIsValid, collageIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USE_PASSWORD", val: event.target.value });
  };

  const collageChangeHandler = (event) => {
    dispatchCollage({ type: "USER_COLLAGE", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "USE_PASSWORD_BLUR" });
  };

  const validateCollageHandler = () => {
    dispatchCollage({ type: "USER_COLLAGE_BLUR" });
  };


  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, collageState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collageState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collage">Collage Name</label>
          <input
            type="text"
            id="collage"
            value={collageState.value}
            onChange={collageChangeHandler}
            onBlur={validateCollageHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

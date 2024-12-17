import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {
  setIsLogedIn,
  setUserName,
  setIsAdmin,
  setPassword,
  setTheRest,
} from "../../redux/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../../constant/apiParams";
import { getLogin, register } from "../../api/users";

export const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [cardentials, setCardentials] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    email: "",
    phone: "",
    numLicense: "",
    tz: "",
    isAdmin: false,
    idUser: 0,
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isDisabled = () => {
    if (showLogin) {
      if (
        cardentials.username !== "" &&
        cardentials.password !== "" &&
        cardentials.email !== ""
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        cardentials.repeatPassword === cardentials.password &&
        cardentials.password !== "" &&
        cardentials.username !== "" &&
        cardentials.email !== ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const clear = () => {
    setCardentials({
      email: "",
      isAdmin: false,
      numLicense: "",
      password: "",
      phone: "",
      repeatPassword: "",
      tz: "",
      username: "",
    });
    dispatch(setIsAdmin(false));
    dispatch(setPassword(""));
    dispatch(setUserName(""));
    dispatch(setIsLogedIn(false));
    dispatch(
      setTheRest({ email: "", phone: "", numLicense: "", tz: "", idUser: 0 })
    );
  };

  const updateUser = (res) => {
    dispatch(setPassword(cardentials.password));
    dispatch(setUserName(cardentials.username));
    dispatch(setIsLogedIn(true));
    if (showLogin) {
      dispatch(setIsAdmin(res.isAdmin));
      dispatch(
        setTheRest({
          email: res.email,
          phone: res.phone,
          numLicense: res.numLicense,
          tz: res.tz,
          idUser: res.idUser,
        })
      );
    } else {
      dispatch(
        setTheRest({
          email: "",
          phone: "",
          numLicense: "",
          tz: "",
        })
      );
      dispatch(setIsLogedIn(false));
    }
  };

  const login = async () => {
    if (showLogin) {
      //validation with server
      const res = await getLogin(BASE_API + "api/users/login", cardentials);
      if (res.status !== 200) {
        clear();
        setErrorMsg("username email or password mismuch your cradentials");
      } else {
        console.log("res", res);
        updateUser(res.data);
        navigate("/");
      }
    } else {
      //create new account
      const res = await register(BASE_API + "api/users/register", cardentials);
      if (res.status === 201) {
        updateUser(res.data);
        navigate("/");
      } else {
        clear();
        setErrorMsg("Change username or email");
      }
    }
  };

  return (
    <Stack height={"100%"} alignItems={"center"} justifyContent={"center"}>
      <Stack width={"30%"} spacing={1}>
        <TextField
          label="username"
          value={cardentials.username}
          onChange={(e) =>
            setCardentials((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />
        <TextField
          type="password"
          value={cardentials.password}
          label="password"
          onChange={(e) =>
            setCardentials((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
        <>
          {!showLogin && (
            <>
              <TextField
                type="password"
                label="password again"
                value={cardentials.repeatPassword}
                onChange={(e) =>
                  setCardentials((prev) => ({
                    ...prev,
                    repeatPassword: e.target.value,
                  }))
                }
              />
            </>
          )}
        </>
        <TextField
          label="email"
          value={cardentials.email}
          onChange={(e) =>
            setCardentials((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <Button
          disabled={!isDisabled()}
          sx={{ boxShadow: "none", textTransform: "none" }}
          variant="contained"
          size="large"
          onClick={login}
        >
          {showLogin ? "login" : "signin"}
        </Button>
      </Stack>
      <Typography marginTop={"2vh"} variant="subtitle1">
        {showLogin ? "Don't have an account yet?" : "Already have un account?"}
      </Typography>
      <div onClick={() => setShowLogin((prev) => !prev)}>
        <Typography
          margin={"2vh 0"}
          variant="subtitle1"
          sx={{ cursor: "pointer", color: "#00FF9C" }}
        >
          {showLogin ? "SignIn" : "Login"}
        </Typography>
      </div>

      <Typography color="error">{errorMsg}</Typography>
    </Stack>
  );
};

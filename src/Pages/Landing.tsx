import React from "react";
import { WithoutNavLayout, SingleContent } from "../Components";
import { pinkPineapple, pineappleTrio } from "../Assets";
import { Row, Image, Col } from "antd";
import { GoogleLogin } from "react-google-login";
import { useCookies } from "react-cookie";
import axios from "axios";

export const Landing = () => {
  const [cookies, setCookie] = useCookies(["EmailAuth"]);
  const [authCookies, setAuthCookie] = useCookies(["UserAuth"]);

  const handleLogin = async (googleData: any) => {
    console.log(googleData);
    console.log(googleData.profileObj.email);
    console.log(googleData.tokenId);
    // verify token id
    axios
      .post("http://localhost:8000/login", {
        token: googleData.tokenId,
      })
      .then((response) => {
        console.log("login!");
        console.log(response);
        console.log(response.data);
        if (Object.keys(response.data).includes("EmailAuth")) {
          setCookie("EmailAuth", response.data.EmailAuth);
        }
        if (Object.keys(response.data).includes("UserAuth")) {
          setAuthCookie("UserAuth", response.data.UserAuth);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // store returned user somehow
  };
  function onChange(a: number) {
    console.log(a);
  }

  const contentStyle: any = {
    height: "500px",
    lineHeight: "500px",
    textAlign: "center",
    background: "transparent",
  };
  return (
    <WithoutNavLayout background={pinkPineapple}>
      <SingleContent>
        <>
          <Row justify={"center"} gutter={[16, 16]}>
            <Col>
              <Image width={"100%"} height={"400px"} src={pineappleTrio} />
            </Col>
          </Row>

          <Row justify={"center"} gutter={[16, 16]}>
            <Col>
              <GoogleLogin
                clientId={
                  "118723902684-csndh1evv68kjef55vi98ukhmsmludk4.apps.googleusercontent.com"
                }
                buttonText="Log in/Sign up with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={"single_host_origin"}
              />
            </Col>
          </Row>
        </>
      </SingleContent>
    </WithoutNavLayout>
  );
};

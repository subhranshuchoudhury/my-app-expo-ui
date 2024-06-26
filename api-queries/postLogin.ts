const loginUser = async (payload: userLoginPayload) => {
  console.log("Payload", payload);
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    mobile: `+91${payload.mobile.replaceAll(" ", "")}`,
    otp: payload.otp.replaceAll(" ", ""),
  });

  let response = await fetch(
    "https://highly-vocal-sponge.ngrok-free.app/auth/login",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

interface userLoginPayload {
  mobile: string;
  otp: string;
}

export default loginUser;

const registerUser = async (payload: payload) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    mobile: `+91${payload.mobile.replaceAll(" ", "")}`,
    name: payload.name.trim(),
  });

  let response = await fetch(
    "https://highly-vocal-sponge.ngrok-free.app/auth/register",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
};

interface payload {
  mobile: string;
  name: string;
}

export default registerUser;

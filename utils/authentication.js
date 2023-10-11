import axios from "axios";

export const loginAuth = async (user) => {
  const url = `https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/login`;

  let data = JSON.stringify({
    email: user.email,
    password: user.password,
  });

  let config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const registerAuth = async (user) => {
  const url = `https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/register`;

  let data = JSON.stringify({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  let config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const checkToken = async () => {
  const token = localStorage.getItem("token");
  const url = `https://cms-admin-v2.ihsansolusi.co.id/testapi/auth/me`;

  let data = "";

  let config = {
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

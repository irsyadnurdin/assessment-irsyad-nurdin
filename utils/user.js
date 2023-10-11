import axios from "axios";
import moment from "moment";

export const getUser = async () => {
  const token = localStorage.getItem("token");
  const url = `https://cms-admin-v2.ihsansolusi.co.id/testapi/user`;

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

export const createUser = async (user) => {
  const token = localStorage.getItem("token");
  const url = `https://cms-admin-v2.ihsansolusi.co.id/testapi/user`;

  const born_date = moment(user.born_date);

  let data = JSON.stringify({
    name: user.name,
    address: user.address,
    gender: user.gender,
    born_date: born_date.format("YYYY-MM-DD"),
  });

  console.log(data);

  let config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json",
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

export const updateUser = async (user) => {
  const token = localStorage.getItem("token");
  const url = `https://cms-admin-v2.ihsansolusi.co.id/testapi/user/${user.id}`;

  const born_date = moment(user.born_date);

  let data = JSON.stringify({
    name: user.name,
    address: user.address,
    gender: user.gender,
    born_date: born_date.format("YYYY-MM-DD"),
  });

  let config = {
    method: "put",
    url: url,
    headers: {
      "Content-Type": "application/json",
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

export const deleteUser = async (user) => {
  const token = localStorage.getItem("token");
  const url = `https://cms-admin-v2.ihsansolusi.co.id/testapi/user/${user.id}`;

  let data = "";

  let config = {
    method: "delete",
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

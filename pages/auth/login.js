import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { FormErrorMessage } from "@/components/GeneralComponent";
import { loginAuth, registerAuth } from "@/utils/authentication";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export default function Login() {
  const router = useRouter();
  const toast = useRef(null);
  const [action, setAction] = useState("login");

  const Login_Form = () => {
    const schema_login = yup
      .object({
        email: yup.string().trim().email("Email tidak valid!").required(),
        password: yup
          .string()
          .trim()
          .min(8, "Field Password Tidak Boleh Kurang Dari 8 Karakter!")
          .required(),
      })
      .required();

    const {
      control: control_login,
      handleSubmit: handleSubmit_Login,
      formState: { errors: errors_login },
    } = useForm({
      resolver: yupResolver(schema_login),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const onSubmit_Login = async (data) => {
      try {
        const response = await loginAuth(data);

        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `Selamat Datang Kembali ${data.email}!`,
          life: 1500,
        });

        localStorage.setItem("token", response.token);

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error?.response?.data?.detail ?? "Kesalahan Tidak Diketahui!",
          life: 3000,
        });
      }
    };

    return (
      <form
        className="w-full flex flex-column gap-2"
        onSubmit={handleSubmit_Login(onSubmit_Login)}
      >
        <Controller
          name="email"
          control={control_login}
          render={({ field, fieldState }) => (
            <>
              <div className="flex flex-col gap-1">
                <InputText
                  id={field.name}
                  value={field.value}
                  placeholder="Masukkan Email Anda"
                  className={`p-inputtext-sm border-2 border-sky-200 p-2 rounded-lg ${classNames(
                    {
                      "p-invalid": fieldState.error,
                    }
                  )}`}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FormErrorMessage errors={errors_login} name={field.name} />
              </div>
            </>
          )}
        />

        <Controller
          name="password"
          control={control_login}
          render={({ field, fieldState }) => (
            <>
              <div className="flex flex-col gap-1">
                <Password
                  id={field.name}
                  {...field}
                  inputRef={field.ref}
                  placeholder="Masukkan Password Anda"
                  feedback={false}
                  toggleMask
                  className={`p-inputtext-sm border-2 border-sky-200 rounded-lg ${classNames(
                    {
                      "p-invalid": fieldState.error,
                    }
                  )}`}
                  inputClassName="w-full p-2 !pr-8"
                />
                <FormErrorMessage errors={errors_login} name={field.name} />
              </div>
            </>
          )}
        />

        <div className="flex items-center justify-end">
          <a
            // to="/forgot-password"
            className="text-sm font-semibold text-indigo-500 hover:text-indigo-700"
            onClick={() => {
              setAction("register");
            }}
          >
            Daftar Akun?
          </a>
        </div>

        <Button
          type="submit"
          label="Masuk"
          icon="pi pi-lock"
          className="text-md bg-blue-500 font-semibold text-white px-4 py-2 rounded-lg"
        />
      </form>
    );
  };

  const Register_Form = () => {
    const schema_register = yup
      .object({
        name: yup
          .string()
          .trim()
          .min(8, "Field Nama Tidak Boleh Kurang Dari 8 Karakter!")
          .required(),
        email: yup.string().trim().email("Email tidak valid!").required(),
        password: yup
          .string()
          .min(8, "Field Password Tidak Boleh Kurang Dari 8 Karakter!")
          .required(),
      })
      .required();

    const {
      control: control_register,
      handleSubmit: handleSubmit_Register,
      reset: reset_register,
      formState: { errors: errors_register },
    } = useForm({
      resolver: yupResolver(schema_register),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    });

    const onSubmit_Register = async (data) => {
      try {
        await registerAuth(data);

        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `Selamat, Akun Anda Berhasil Didaftarkan!`,
          life: 2000,
        });

        reset_register();
        setAction("login");
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Kesalahan Tidak Diketahui!",
          life: 3000,
        });
      }
    };

    return (
      <form
        className="w-full flex flex-column gap-2"
        onSubmit={handleSubmit_Register(onSubmit_Register)}
      >
        <Controller
          name="name"
          control={control_register}
          render={({ field, fieldState }) => (
            <>
              <div className="flex flex-col gap-1">
                <InputText
                  id={field.name}
                  value={field.value}
                  placeholder="Masukkan Nama Anda"
                  className={`p-inputtext-sm border-2 border-sky-200 p-2 rounded-lg ${classNames(
                    {
                      "p-invalid": fieldState.error,
                    }
                  )}`}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FormErrorMessage errors={errors_register} name={field.name} />
              </div>
            </>
          )}
        />

        <Controller
          name="email"
          control={control_register}
          render={({ field, fieldState }) => (
            <>
              <div className="flex flex-col gap-1">
                <InputText
                  id={field.name}
                  value={field.value}
                  placeholder="Masukkan Email Anda"
                  className={`p-inputtext-sm border-2 border-sky-200 p-2 rounded-lg ${classNames(
                    {
                      "p-invalid": fieldState.error,
                    }
                  )}`}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FormErrorMessage errors={errors_register} name={field.name} />
              </div>
            </>
          )}
        />

        <Controller
          name="password"
          control={control_register}
          render={({ field, fieldState }) => (
            <>
              <div className="flex flex-col gap-1">
                <Password
                  id={field.name}
                  {...field}
                  inputRef={field.ref}
                  placeholder="Masukkan Password Anda"
                  feedback={false}
                  toggleMask
                  className={`p-inputtext-sm border-2 border-sky-200 rounded-lg ${classNames(
                    {
                      "p-invalid": fieldState.error,
                    }
                  )}`}
                  inputClassName="w-full p-2 !pr-8"
                />
                <FormErrorMessage errors={errors_register} name={field.name} />
              </div>
            </>
          )}
        />

        <div className="flex items-center justify-end">
          <a
            className="text-sm font-semibold text-indigo-500 hover:text-indigo-700"
            onClick={() => {
              setAction("login");
            }}
          >
            Sudah Punya Akun?
          </a>
        </div>

        <Button
          type="submit"
          label="Register"
          icon="pi pi-lock"
          className="text-md bg-blue-500 font-semibold text-white px-4 py-2 rounded-lg"
        />
      </form>
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Toast ref={toast} className="" />
      <div
        className="relative flex items-center justify-center overflow-hidden bg-sky-100 py-4"
        style={{ minHeight: "100svh" }}
      >
        <div
          className="fixed -top-32 -left-24 z-0 h-60 w-60 rotate-45 transform rounded-xl bg-sky-600 lg:-top-5 lg:-left-16"
          style={{
            boxShadow: "10px 10px 20px #076698, -10px -10px 10px #ffffff",
          }}
        ></div>
        <div
          className="fixed -bottom-6 -right-10 h-48 w-48 rotate-12 transform rounded-xl bg-sky-600"
          style={{
            boxShadow: "-10px 10px 20px #076698, 10px -10px 10px #ffffff",
          }}
        ></div>
        <div className="z-1 w-10/12 rounded-2xl bg-white py-12 px-10 shadow-2xl sm:w-8/12 md:w-6/12 md:py-12 md:px-12 lg:w-4/12">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/logo.png"
              alt="Ihsan Solusi Informatika"
              className="w-52"
            />
            <h2 className="text-sm my-2 font-semibold tracking-tight text-gray-700 md:text-xl">
              Silahkan Masuk Terlebih Dahulu!
            </h2>
            {action === "login" ? <Login_Form /> : <Register_Form />}
          </div>
        </div>
      </div>
    </>
  );
}

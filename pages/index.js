import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { FormLabel, FormErrorMessage } from "@/components/GeneralComponent";
import { TopBar } from "@/components/TopBarComponent";
import { checkToken } from "@/utils/authentication";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Divider } from "primereact/divider";

const Index = () => {
  const router = useRouter();
  const [result1, setResult1] = useState([]);
  const [result2, setResult2] = useState([]);
  const [result3, setResult3] = useState([]);
  const [result4, setResult4] = useState(null);

  const schema = yup
    .object({
      value: yup.string().required("Field Ini Tidak Boleh Kosong!"),
    })
    .required();

  const schema_3 = yup
    .object({
      value: yup
        .number()
        .min(1)
        .max(1000)
        .required("Field Ini Tidak Boleh Kosong!"),
    })
    .required();

  const {
    control: control_1,
    setValue: setValue_1,
    handleSubmit: handleSubmit_1,
    formState: { errors: errors_1 },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: "",
    },
  });

  const {
    control: control_2,
    setValue: setValue_2,
    handleSubmit: handleSubmit_2,
    formState: { errors: errors_2 },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: "",
    },
  });

  const {
    control: control_3,
    setValue: setValue_3,
    handleSubmit: handleSubmit_3,
    formState: { errors: errors_3 },
  } = useForm({
    resolver: yupResolver(schema_3),
    defaultValues: {
      value: "",
    },
  });

  const {
    control: control_4,
    setValue: setValue_4,
    handleSubmit: handleSubmit_4,
    formState: { errors: errors_4 },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      (async () => {
        try {
          await checkToken();
        } catch (error) {
          localStorage.clear();
          setTimeout(() => {
            router.push("/auth/login");
          }, 100);
        }
      })();
    } else {
      localStorage.clear();
      setTimeout(() => {
        router.push("/auth/login");
      }, 100);
    }
  }, []);

  const onSubmit_1 = (data) => {
    const result = [];
    const original_string = data.value;

    // Format 1
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const formatted_string_1 = original_string
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(" ")
      .map((word) => capitalizeFirstLetter(word))
      .join(" ")
      .trim();

    result.push(formatted_string_1);

    // Format 2
    const cleaned_string_2 = original_string
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim();

    const formatted_string_2 = cleaned_string_2.replace(/\s+/g, "-");

    result.push(formatted_string_2);

    setResult1(result);
  };

  const onSubmit_2 = (data) => {
    const original_string = data.value;
    const result = [];

    const temp = {};
    for (const char of original_string) {
      if (temp[char]) {
        temp[char] += 1;
      } else {
        temp[char] = 1;
      }
    }

    Object.keys(temp).forEach((key) => {
      result.push({ key: key, value: temp[key] });
    });

    setResult2(result);
  };

  const onSubmit_3 = (data) => {
    const n = data.value;
    const result = [];

    const deret_1 = [];
    for (let i = 1; i <= n; i++) {
      const square = i * i;
      deret_1.push(square);
    }
    result.push(deret_1);

    const deret_2 = [];
    let inisialisasi = 1;
    for (let i = 0; i < n; i++) {
      if (i === 0) {
        deret_2.push(1);
      } else {
        deret_2.push(deret_2[i - 1] + inisialisasi);
        inisialisasi += 2;
      }
    }
    result.push(deret_2);

    const fibonacci = [0, 1];
    for (let i = 2; i < n; i++) {
      fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
    }

    const deret_3 = [];
    for (let i = 0; i < n; i++) {
      if (i === 0) {
        deret_3.push(0);
      } else {
        deret_3.push(deret_3[i - 1] + fibonacci[i - 1]);
      }
    }
    result.push(deret_3);

    setResult3(result);
  };

  const onSubmit_4 = (data) => {
    const original_string = data.value;

    const numbers = original_string
      .replace(/[^0-9,\s]/g, "")
      .split(",")
      .map((item) => parseInt(item.trim(), 10));

    const max_number = Math.max(...numbers);
    const min_number = Math.min(...numbers);
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;

    setResult4({
      max: max_number,
      min: min_number,
      average: average,
    });
  };

  return (
    <div>
      <TopBar target="/index" />
      <main className="my-4">
        <section className="container px-4 mx-auto">
          <div className="card">
            <Accordion multiple activeIndex={[0, 1, 2, 3]}>
              <AccordionTab header="Pertanyaan Nomor 1">
                <div className="card flex flex-col">
                  <label className="mb-2 block text-md font-bold">
                    Pertanyaan :
                  </label>
                  <p>
                    Diberikan sebuah string yang dapat mengandung huruf, angka,
                    spasi dan tanda baca.
                  </p>
                  <ul className="list-disc list-inside">
                    <li>
                      Ubahlah format string tersebut menjadi format penulisan
                      judul yang hanya menerima huruf dan angka
                    </li>
                    <li>
                      Ubahlah format string tersebut menjadi format penulisan
                      judul yang hanya menerima huruf dan angka
                    </li>
                  </ul>

                  <Divider className="border" />

                  <form
                    onSubmit={handleSubmit_1(onSubmit_1)}
                    className="flex flex-column gap-2"
                  >
                    <Controller
                      name="value"
                      control={control_1}
                      render={({ field, fieldState }) => (
                        <>
                          <FormLabel label="Value :" />
                          <div className="p-inputgroup flex-1">
                            <span
                              className="p-inputgroup-addon px-4 rounded-l-md"
                              onClick={() =>
                                setValue_1("value", "SELamAt PaGi Dunia123!!")
                              }
                            >
                              Paste Example
                            </span>
                            <InputText
                              id={field.name}
                              value={field.value ?? null}
                              placeholder="example. SELamAt PaGi Dunia123!!”"
                              className={`p-inputtext-sm border-2 border-sky-200 px-2 py-1 ${classNames(
                                {
                                  "p-invalid": fieldState.error,
                                }
                              )}`}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                            <Button
                              icon="pi pi-check"
                              type="submit"
                              className="bg-blue-500 text-white px-4 rounded-r-md"
                            />
                          </div>
                          <FormErrorMessage
                            errors={errors_1}
                            name={field.name}
                          />
                        </>
                      )}
                    />
                  </form>
                  {result1.length !== 0 && (
                    <>
                      <Divider className="border" />
                      <label className="mb-2 block text-md font-bold">
                        Result :
                      </label>
                      <ul className="list-disc list-inside">
                        {result1.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </AccordionTab>
              <AccordionTab header="Pertanyaan Nomor 2">
                <div className="card flex flex-col">
                  <label className="mb-2 block text-md font-bold">
                    Pertanyaan :
                  </label>
                  <p>
                    Diberikan sebuah string acak, hitunglah berapa jumlah setiap
                    karakter yang ada dalam string tersebut
                  </p>

                  <Divider className="border" />

                  <form
                    onSubmit={handleSubmit_2(onSubmit_2)}
                    className="flex flex-column gap-2"
                  >
                    <Controller
                      name="value"
                      control={control_2}
                      render={({ field, fieldState }) => (
                        <>
                          <FormLabel label="Value :" />
                          <div className="p-inputgroup flex-1">
                            <span
                              className="p-inputgroup-addon px-4 rounded-l-md"
                              onClick={() => setValue_2("value", "aabbbahwws")}
                            >
                              Paste Example
                            </span>
                            <InputText
                              id={field.name}
                              value={field.value ?? null}
                              placeholder="example. “aabbbahwws”"
                              className={`p-inputtext-sm border-2 border-sky-200 p-1 rounded-md ${classNames(
                                {
                                  "p-invalid": fieldState.error,
                                }
                              )}`}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                            <Button
                              icon="pi pi-check"
                              type="submit"
                              className="bg-blue-500 text-white px-4 rounded-r-md"
                            />
                          </div>
                          <FormErrorMessage
                            errors={errors_2}
                            name={field.name}
                          />
                        </>
                      )}
                    />
                  </form>

                  {result2.length !== 0 && (
                    <>
                      <Divider className="border" />
                      <label className="mb-2 block text-md font-bold">
                        Result :
                      </label>
                      <ul className="list-disc list-inside">
                        {result2.map((item, index) => (
                          <li key={index}>
                            {item.key} : {item.value}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </AccordionTab>
              <AccordionTab header="Pertanyaan Nomor 3">
                <div className="card flex flex-col">
                  <label className="mb-2 block text-md font-bold">
                    Pertanyaan :
                  </label>
                  <p>
                    Buatlah kode pemrograman untuk menampilkan deret angka
                    sebagai berikut, sebanyak inputan user:
                  </p>
                  <ul className="list-disc list-inside">
                    <li>1 4 9 16 25 36 49 64 81 100 ...</li>
                    <li>1 2 5 10 17 26 37 50 65 82 ...</li>
                    <li>0 0 1 2 4 7 12 20 33 54 ...</li>
                  </ul>

                  <Divider className="border" />

                  <form
                    onSubmit={handleSubmit_3(onSubmit_3)}
                    className="flex flex-column gap-2"
                  >
                    <Controller
                      name="value"
                      control={control_3}
                      render={({ field, fieldState }) => (
                        <>
                          <FormLabel label="Value :" />
                          <div className="p-inputgroup flex-1">
                            <span
                              className="p-inputgroup-addon px-4 rounded-l-md"
                              onClick={() => setValue_3("value", 10)}
                            >
                              Paste Example
                            </span>
                            <InputNumber
                              id={field.name}
                              value={field.value ?? null}
                              inputId="minmax-buttons"
                              placeholder="example. “12”"
                              className={`p-inputtext-sm border-2 border-sky-200 p-1 rounded-md ${classNames(
                                {
                                  "p-invalid": fieldState.error,
                                }
                              )}`}
                              onValueChange={(e) =>
                                field.onChange(e.target.value)
                              }
                              mode="decimal"
                              showButtons
                              min={1}
                              max={100}
                            />
                            <Button
                              icon="pi pi-check"
                              type="submit"
                              className="bg-blue-500 text-white px-4 rounded-r-md"
                            />
                          </div>
                          <FormErrorMessage
                            errors={errors_3}
                            name={field.name}
                          />
                        </>
                      )}
                    />
                  </form>
                  {result3.length !== 0 && (
                    <>
                      <Divider className="border" />
                      <label className="mb-2 block text-md font-bold">
                        Result :
                      </label>
                      <ul className="list-disc list-inside">
                        {result3.map((item, index) => (
                          <li key={index}>{item.join(", ")}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </AccordionTab>
              <AccordionTab header="Pertanyaan Nomor 4">
                <div className="card flex flex-col">
                  <label className="mb-2 block text-md font-bold">
                    Pertanyaan :
                  </label>
                  <p>
                    Diberikan sebuah deret angka random oleh user berupa string
                    (dipisahkan oleh spasi atau koma (,), ex. “20, 21, 80, 21,
                    55, 31, 22” ) hitunglah:
                  </p>
                  <ul className="list-disc list-inside">
                    <li>Nilai Terbesar</li>
                    <li>Nilai Terkecil</li>
                    <li>Nilai Rata-rata</li>
                  </ul>

                  <Divider className="border" />

                  <form
                    onSubmit={handleSubmit_4(onSubmit_4)}
                    className="flex flex-column gap-2"
                  >
                    <Controller
                      name="value"
                      control={control_4}
                      render={({ field, fieldState }) => (
                        <>
                          <FormLabel label="Value :" />
                          <div className="p-inputgroup flex-1">
                            <span
                              className="p-inputgroup-addon px-4 rounded-l-md"
                              onClick={() =>
                                setValue_4(
                                  "value",
                                  "20, 21, 80, 21, 55, 31, 22"
                                )
                              }
                            >
                              Paste Example
                            </span>
                            <InputText
                              id={field.name}
                              value={field.value ?? null}
                              placeholder="example. “20, 21, 80, 21, 55, 31, 22”"
                              className={`p-inputtext-sm border-2 border-sky-200 p-1 rounded-md ${classNames(
                                {
                                  "p-invalid": fieldState.error,
                                }
                              )}`}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                            <Button
                              icon="pi pi-check"
                              type="submit"
                              className="bg-blue-500 text-white px-4 rounded-r-md"
                            />
                          </div>
                          <FormErrorMessage
                            errors={errors_4}
                            name={field.name}
                          />
                        </>
                      )}
                    />
                  </form>
                  {result4 !== null && (
                    <>
                      <Divider className="border" />
                      <label className="mb-2 block text-md font-bold">
                        Result :
                      </label>
                      <ul className="list-disc list-inside">
                        <li>Nilai Terbesar : {result4.max}</li>
                        <li>Nilai Terkecil : {result4.min}</li>
                        <li>Nilai Rata-rata : {result4.average}</li>
                      </ul>
                    </>
                  )}
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

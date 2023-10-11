import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { FormLabel, LoadingSpinner } from "@/components/GeneralComponent";
import { TopBar } from "@/components/TopBarComponent";
import { getUser, createUser, updateUser, deleteUser } from "@/utils/user";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import moment from "moment";
import "moment/locale/id";
import { checkToken } from "@/utils/authentication";

const schema = yup
  .object({
    name: yup
      .string()
      .min(8, "Field Nama Tidak Boleh Kurang Dari 8 Karakter!")
      .required("Field Nama Tidak Boleh Kosong!"),
    address: yup.string().required("Field Alamat Harus Diisi!"),
    born_date: yup.date().required("Field Tanggal Harus Diisi!"),
  })
  .required();

const User = () => {
  const dt = useRef(null);
  const toast = useRef(null);
  const router = useRouter();

  const [action, setAction] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [userDialog, setUserDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  const {
    control,
    trigger,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      gender: "l",
      born_date: null,
    },
  });

  const getUserAction = async () => {
    setIsLoading(true);

    try {
      const response = await getUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createUserAction = async (data) => {
    try {
      await createUser(data);

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: `Selamat, Data Berhasil Ditambahkan!`,
        life: 2000,
      });

      reset();
      setAction(null);
      setUserDialog(false);
      setUser(null);
      await getUserAction();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateUserAction = async (data) => {
    try {
      await updateUser(data);

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: `Selamat, Data Berhasil Diperbaharui!`,
        life: 2000,
      });

      reset();
      setAction(null);
      setUserDialog(false);
      setUser(null);
      await getUserAction();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteUserAction = async () => {
    try {
      const response = await deleteUser(user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

    getUserAction();
  }, []);

  const gender_body_template = (gender_data) => {
    let result;

    switch (gender_data) {
      case "l":
        result = <Tag value="Laki-laki" severity="success" />;
        break;
      case "p":
        result = <Tag value="Perempuan" severity="warning" />;
        break;
      default:
        result = "Format Tidak Dikenali";
        break;
    }

    return result;
  };

  const birthday_body_template = (date_data) => {
    const date = moment(date_data);
    moment.locale("id");

    const formatted_date = date.format("dddd, DD MMMM YYYY");

    return formatted_date;
  };

  const date_body_template = (date_data) => {
    const date = moment(date_data);
    moment.locale("id");

    const formatted_date = date.format("DD MMMM YYYY HH:mm");

    return formatted_date;
  };

  const Save_User = async () => {
    try {
      const validasi = await trigger();
      if (validasi) {
        const data = getValues();

        if (action === "create") {
          await createUserAction(data);
        } else {
          await updateUserAction(data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Edit_User = (user) => {
    setValue("id", user.id);
    setValue("name", user.name);
    setValue("address", user.address);
    setValue("gender", user.gender);
    setValue("born_date", new Date(user.born_date));
    setUserDialog(true);
    setAction("update");
  };

  const Delete_User = async () => {
    await deleteUserAction();
    getUserAction();
    setDeleteUserDialog(false);
    setUser(null);

    toast.current.show({
      severity: "success",
      summary: "Berhasil",
      detail: "Data User Berhasil Dihapus",
      life: 3000,
    });
  };

  const action_body_template = (row_data) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          className="border border-sky-500 text-sky-500 mr-2"
          onClick={() => {
            Edit_User(row_data);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          className="border border-red-500 text-red-500"
          onClick={() => {
            setUser(row_data);
            setDeleteUserDialog(true);
          }}
        />
      </React.Fragment>
    );
  };

  const userDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        outlined
        className="text-sm border border-sky-500 bg-white font-semibold text-sky-500 px-3 py-2 rounded-lg"
        onClick={() => setUserDialog(false)}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="ml-2 text-sm border border-sky-500 bg-sky-500 font-bold text-white px-3 py-2 rounded-lg"
        onClick={Save_User}
      />
    </React.Fragment>
  );

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="Batal"
        icon="pi pi-times"
        outlined
        className="text-xs border border-sky-500 bg-white font-semibold text-sky-500 px-3 py-2 rounded-lg"
        onClick={() => setDeleteUserDialog(false)}
      />
      <Button
        label="Ya, Hapus"
        icon="pi pi-check"
        className="ml-2 text-xs border border-red-500 bg-red-500 font-bold text-white px-3 py-2 rounded-lg"
        onClick={Delete_User}
      />
    </React.Fragment>
  );

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Tambah Data"
          icon="pi pi-plus"
          className="text-sm bg-green-500 font-semibold text-white px-3 py-2 rounded-lg"
          onClick={() => {
            reset();
            setAction("create");
            setUserDialog(true);
          }}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="text-sm bg-purple-500 font-semibold text-white px-3 py-2 rounded-lg"
        onClick={() => {
          dt.current.exportCSV();
        }}
      />
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Data User</h4>
      {/* <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          placeholder="Cari Data"
          onInput={(e) => {
            if (e.target.value) {
              setGlobalFilter(e.target.value);
            } else {
              setGlobalFilter(" ");
            }
          }}
          className={`border-2 border-sky-200 rounded-lg p-1 pl-5`}
        />
      </span> */}
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <TopBar target="/user" />

      <main className="my-4">
        <section className="container px-4 mx-auto">
          <div className="card">
            <Toolbar
              className="mb-4"
              left={leftToolbarTemplate}
              right={rightToolbarTemplate}
            ></Toolbar>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <DataTable
                ref={dt}
                dataKey="id"
                value={users}
                sortMode="multiple"
                removableSort
                scrollable
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                globalFilter={globalFilter}
                header={header}
                columnResizeMode="expand"
                resizableColumns
                className="border rounded-lg"
                rowClassName={"border"}
                cellClassName={"border"}
              >
                <Column field="id" header="ID" sortable></Column>
                <Column field="name" header="Nama" sortable></Column>
                <Column field="address" header="Alamat" sortable></Column>
                <Column
                  field="gender"
                  header="Gender"
                  sortable
                  body={(rowData) => gender_body_template(rowData.gender)}
                />
                <Column
                  field="born_date"
                  header="Tanggal Lahir"
                  sortable
                  body={(rowData) => birthday_body_template(rowData.born_date)}
                />
                <Column
                  field="created_at"
                  header="Tanggal Input"
                  sortable
                  body={(rowData) => date_body_template(rowData.created_at)}
                />
                <Column
                  body={action_body_template}
                  exportable={false}
                  style={{ minWidth: "12rem" }}
                ></Column>
              </DataTable>
            )}

            <Dialog
              visible={userDialog}
              style={{ width: "32rem" }}
              breakpoints={{ "960px": "75vw", "641px": "90vw" }}
              header="User Form"
              modal
              className="p-fluid"
              footer={userDialogFooter}
              onHide={() => setUserDialog(false)}
            >
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <FormLabel label="Name :" />
                    <div className="flex flex-col gap-2 mb-3">
                      <InputText
                        id={field.name}
                        value={field.value ?? null}
                        placeholder="Enter Your Name"
                        className={`p-inputtext-sm border-2 border-sky-200 p-1 rounded-md ${classNames(
                          {
                            "p-invalid": fieldState.error,
                          }
                        )}`}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      {getFormErrorMessage(field.name)}
                    </div>
                  </>
                )}
              />

              <Controller
                name="address"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <FormLabel label="Address :" />
                    <div className="flex flex-col gap-2 mb-3">
                      <InputTextarea
                        id={field.name}
                        value={field.value ?? null}
                        placeholder="Enter Your Address"
                        className={`p-inputtext-sm border-2 border-sky-200 p-1 rounded-md ${classNames(
                          {
                            "p-invalid": fieldState.error,
                          }
                        )}`}
                        onChange={(e) => field.onChange(e.target.value)}
                        rows={3}
                      />
                      {getFormErrorMessage(field.name)}
                    </div>
                  </>
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <>
                    <FormLabel label="Gender :" />
                    <div className="flex flex-col gap-2 mb-3">
                      <div className="flex align-items-left">
                        <RadioButton
                          inputId="f5"
                          {...field}
                          inputRef={field.ref}
                          value="l"
                          checked={field.value === "l"}
                        />
                        <label htmlFor="f5" className="ml-1 mr-3">
                          Male
                        </label>

                        <RadioButton
                          inputId="f6"
                          {...field}
                          value="p"
                          checked={field.value === "p"}
                        />
                        <label htmlFor="f6" className="ml-1 mr-3">
                          Female
                        </label>
                      </div>
                      {getFormErrorMessage(field.name)}
                    </div>
                  </>
                )}
              />

              <Controller
                name="born_date"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <FormLabel label="Born Date :" />
                    <div className="gap-2 mb-3 w-full">
                      <Calendar
                        inputId={field.name}
                        value={field.value}
                        placeholder="Enter Your Born Date"
                        className={`p-inputtext-sm border-2 border-sky-200 p-1 rounded-md ${classNames(
                          {
                            "p-invalid": fieldState.error,
                          }
                        )}`}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          console.log(e.target.value);
                        }}
                        dateFormat="dd/mm/yy"
                      />
                      {getFormErrorMessage(field.name)}
                    </div>
                  </>
                )}
              />
            </Dialog>

            <Dialog
              visible={deleteUserDialog}
              style={{ width: "32rem" }}
              breakpoints={{ "960px": "75vw", "641px": "90vw" }}
              header="Konfirmasi"
              modal
              footer={deleteProductDialogFooter}
              onHide={() => setDeleteUserDialog(false)}
            >
              <div className="confirmation-content">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {user && (
                  <span>
                    Apakah Kamu Yakin Ingin Menghapus Data Ini :{" "}
                    <b>{user.name}</b>?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        </section>
      </main>
    </>
  );
};

export default User;

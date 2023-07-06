import Swal from "sweetalert2";

export const ErrorDialog = (msg) => {
    Swal.fire(msg,"","error");
}
export const SuccessDialog = (msg) => {
    Swal.fire(msg,"","success");
}
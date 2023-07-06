import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Typography, Box, Button, Modal } from "@mui/material";
import noperson from "../../assets/no-person.png";
import { store } from "../../context/MainContext";
import { SuccessDialog, ErrorDialog } from "../../components/Dialog";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../../styles/picture_upload.css";
import { Img } from "react-image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFF",
  width: "75%",
  border: "1px solid #DEDEDE",
  borderRadius: "10px",
  p: 4,
};

export default function PictureUpload({ userId, isEdit }) {
  const { a3m_api_root } = useContext(store);
  const [imageId, setImageId] = useState(0);

  const [exImage, setExImage] = useState(noperson);
  const [cropper, setCropper] = useState();
  const [image, setImage] = useState(noperson);
  const [cropData, setCropData] = useState(Object);
  const [isChangeLogo, setIsChangeLogo] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (userId > 0) {
      axios
        .get(`${a3m_api_root}/auth/api/user/${userId}`)
        .then((result) => {
          setImage(result.data?.pic?.url || noperson);
          setExImage(result.data?.pic?.url || noperson);
          setImageId(result.data?.pic_id);
        })
        .catch((err) => console.log(err));
    }
  }, [a3m_api_root, userId]);

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setIsChangeLogo(true);
    };
    reader.readAsDataURL(file);
    setModalVisible(true);
  };

  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "picture.png", { type: "image/png" });
        });
      setImage(URL.createObjectURL(file));
      setCropData(file);
      setModalVisible(false);
    }
  };

  async function saveLogo() {
    setIsChangeLogo(true);
    await deleteExLogo();
    await uploadLogo();
    setIsChangeLogo(false);
  }

  async function uploadLogo() {
    const formData = new FormData();
    formData.append("file", cropData);

    await axios
      .post(`${a3m_api_root}/auth/api/user/${userId}/file`, formData)
      .then((result) => {
        SuccessDialog("Picture successfully changed");
      })
      .catch((err) => {
        ErrorDialog("An error occurred. The picture could not be changed.");
        console.log(err);
      });
  }

  async function deleteExLogo() {
    if (imageId > 0) {
      await axios
        .delete(`${a3m_api_root}/auth/api/user/${userId}/file/${imageId}`)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }
  }

  console.log(image);

  if (userId > 0) {
    return (
      <>
        <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
          <Box sx={style}>
            <Typography variant="h5">Crop Image</Typography>
            <Cropper
              style={{ height: 400, width: "100%", marginTop: "1rem" }}
              zoomTo={0.2}
              initialAspectRatio={1 / 1}
              aspectRatio={1 / 1}
              src={image}
              viewMode={1}
              cropBoxResizable={true}
              background={false}
              checkOrientation={true}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={false}
            />

            <Box
              variant="div"
              sx={{ display: "flex", justifyContent: "right", marginTop: 1 }}
            >
              <Button variant="contained" color="info" onClick={getCropData}>
                Crop
              </Button>
              <Button
                sx={{ marginLeft: 1 }}
                variant="contained"
                color="error"
                onClick={() => {
                  setImage(exImage);
                  setModalVisible(false);
                  setIsChangeLogo(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        <Box variant="div">
          <Img
            src={[image, noperson]}
            alt=""
            className="bordered-10"
            width="100%"
          />
        </Box>

        <Box variant="div" className="file-box">
          {!isChangeLogo && isEdit && (
            <input
              type="file"
              name="file"
              className="custom-file-input"
              onChange={onChange}
              accept="image/*"
            />
          )}

          {isChangeLogo && (
            <>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={saveLogo}
                sx={{ marginRight: 1 }}
              >
                Save
              </Button>

              <Button
                size="small"
                color="error"
                variant="outlined"
                onClick={() => {
                  setImage(exImage);
                  setIsChangeLogo(false);
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box>
          <img
            src={image}
            alt="Undefined"
            className="bordered-10"
            width="100%"
          />
        </Box>
      </>
    );
  }
}

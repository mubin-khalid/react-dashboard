//@ts-nocheck
import { ChangeEvent, FC, useState } from "react";

type ImageHandlerType = {
  uploadFn: (arg0: Blob | null) => void;
  src?: string | null | undefined | ArrayBuffer;
};

const ImageHandler: FC<ImageHandlerType> = ({ uploadFn }) => {
  const [error, setError] = useState("");

  const isValidFileUploaded = (file: File | undefined) => {
    const reader = new FileReader();

    //Read the contents of Image File.
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      //Initiate the JavaScript Image object.
      const image = new Image();

      //Set the Base64 string return from FileReader as source.
      image.src = e?.target?.result;

      //Validate the File Height and Width.
      image.onload = function () {
        const height = this.height;
        const width = this.width;
        if (height < 100 || width < 100) {
          setError("logo dimensions are less than 100x100");
          return false;
        }

        return true;
      };
    };
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    isValidFileUploaded(file);
    if (file && error === "") {
      uploadFn(file);
      e.target.value = "";
    }
  };
  return (
    <div className="flex flex-col">
      <input
        onChange={(e) => handleImageChange(e)}
        onClick={() => setError("")}
        type="file"
        name="logo"
      />
      <span className="text-xs text-red-600">{error}</span>
    </div>
  );
};

export default ImageHandler;

//

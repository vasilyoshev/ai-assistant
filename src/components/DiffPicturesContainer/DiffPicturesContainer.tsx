import { useEffect, useState } from "react";
import { useGeneratePicsMutation } from "api";
import { DiffPicture, InpaintMask } from "components";
import { Style } from "enums";
import styles from "./DiffPicturesContainer.module.scss";

export const DiffPicturesContainer = () => {
  const [generatePics, generatedPics] = useGeneratePicsMutation();

  const [mask, setMask] = useState<string>();

  const onMaskGenerated = (canvas: HTMLCanvasElement) => {
    setMask(canvas.toDataURL().split(",")[1]);
  };

  useEffect(() => {
    if (!mask) return;

    generatePics({ maskImage: mask, style: Style.Neonpunk, topic: "city" });
  }, [mask]);

  useEffect(() => {
    if (!generatedPics) return;

    console.log(generatedPics);
  }, [generatedPics]);

  return (
    <div className={styles.wrapper}>
      {generatedPics.isSuccess && (
        <>
          <DiffPicture src={`data:image/png;base64, ${generatedPics.data?.originalPic.artifacts[0].base64}`} />
          <DiffPicture src={`data:image/png;base64, ${generatedPics.data?.maskedPic.artifacts[0].base64}`} />
        </>
      )}
      <InpaintMask onMaskGenerated={onMaskGenerated} />
    </div>
  );
};

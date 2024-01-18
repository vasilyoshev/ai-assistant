import { useEffect, useState } from "react";
import FormData from "form-data";
import { useGetMaskedPicMutation, useGetOriginalPicMutation } from "api";
import { DiffPicture, InpaintMask } from "components";
import styles from "./DiffPicturesContainer.module.scss";
import { base64ToBlob } from "utils";

export const DiffPicturesContainer = () => {
  const [getOriginalPic, originalPic] = useGetOriginalPicMutation();
  const [getMaskedPic, maskedPic] = useGetMaskedPicMutation();

  const [mask, setMask] = useState<string>();

  const onMaskGenerated = (canvas: HTMLCanvasElement) => {
    setMask(canvas.toDataURL().split(",")[1]);
  };

  useEffect(() => {
    const body = {
      text_prompts: [
        {
          text: "anime artwork city. anime style, key visual, vibrant, studio anime, highly detailed",
          weight: 1,
        },
        {
          text: "photo, deformed, black and white, realism, disfigured, low contrast",
          weight: -1,
        },
      ],
      sampler: "K_EULER_ANCESTRAL",
    };

    getOriginalPic(body);
  }, []);

  useEffect(() => {
    if (!originalPic?.data?.artifacts[0]?.base64 || !mask) return;

    // console.log("originalPic")
    // console.log("originalPic")
    // console.log("originalPic")
    // console.log("originalPic")
    // console.log("originalPic")
    // const test = base64ToBlob(originalPic.data.artifacts[0].base64)
    // console.log(test)
    // console.log("mask")
    // console.log("mask")
    // console.log("mask")
    // console.log("mask")
    // console.log("mask")
    // const test2 = base64ToBlob(mask)
    // console.log(test2)

    const form = new FormData();
    form.append("mask_source", "MASK_IMAGE_BLACK");
    form.append(
      "init_image",
      base64ToBlob(originalPic.data.artifacts[0].base64),
    );
    form.append("mask_image", base64ToBlob(mask));
    form.append(
      "text_prompts[0][text]",
      // eslint-disable-next-line max-len
      "test",
    );
    form.append("text_prompts[0][weight]", "1");
    form.append(
      "text_prompts[1][text]",
      "photograph, deformed, glitch, noisy, realistic, stock photo",
    );
    form.append("text_prompts[1][weight]", "-1");
    form.append("sampler", "K_EULER_ANCESTRAL");

    getMaskedPic(form as any);
  }, [originalPic, mask]);

  return (
    <div className={styles.wrapper}>
      {originalPic.isSuccess && maskedPic.isSuccess && (
        <>
          <DiffPicture
            src={`data:image/png;base64, ${originalPic.data?.artifacts[0].base64}`}
          />
          <DiffPicture
            src={`data:image/png;base64, ${maskedPic.data?.artifacts[0].base64}`}
          />
        </>
      )}
      <InpaintMask onMaskGenerated={onMaskGenerated} />
    </div>
  );
};

// <DiffPicture src={process.env.PUBLIC_URL + "/mockImage.png"} />

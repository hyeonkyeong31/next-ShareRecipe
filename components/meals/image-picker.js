"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();
    function handleClick() {
        imageInput.current.click();
    }
    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }
        const filedReader = new FileReader();

        filedReader.onload = () => {
            setPickedImage(filedReader.result);
        };
        filedReader.readAsDataURL(file);
    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image
                            src={pickedImage}
                            alt="The image selected by the user."
                            fill
                        />
                    )}
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                />
                <button
                    className={classes.button}
                    type="button"
                    onClick={handleClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
}

"use client";
import { UploadButton } from "~/utils/uploadthing";

export default function UploadthingUploadButton() {
    return (
        <UploadButton
            endpoint="csvUploader"
            onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
            }}
        />
    );
}

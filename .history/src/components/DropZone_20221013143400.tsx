import Image from "next/image";

const DropZone = (data) => {
  return (
    <>
      <div>
        <Image src="/upload.svg" alt="upload" height={50} width={50} />
        <input id="fileSelect" type="file" multiple/>
        <label htmlFor="fileSelect">You can select multiple Files</label>
        <h3>
          or drag &amp; drop your files here
        </h3>
      </div>
      {/* Pass the selectect or dropped files as props */}
    </>
  );
};

export default DropZone;

const DropZone = () => {
  return (
    <>
      <div>
        <input id="fileSelect" type='file' accept=".jpeg, .jpg, .png"/>
        <label htmlFor="fileSelect">You can select multiple Files</label>
      </div>
      {/* Pass the selectect or dropped files as props */}
    </>
  );
};

export default DropZone;
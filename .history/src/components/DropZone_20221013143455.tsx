
const DropZone = () => {
  return (
    <>
      <div>
        <input id="fileSelect" type="file"/>
        <label htmlFor="fileSelect">You can select multiple Files</label>
      </div>
      {/* Pass the selectect or dropped files as props */}
    </>
  );
};

export default DropZone;

const DropZone = () => {
  return (
    <div className="divInput">
      <div className='inputImage'>
        <input id="fileSelect" type='file' accept=".jpeg, .jpg, .png"/>
      </div>
      {/* Pass the selectect or dropped files as props */}
    </div>
  );
};

export default DropZone;
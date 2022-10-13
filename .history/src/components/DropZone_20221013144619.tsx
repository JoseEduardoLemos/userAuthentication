
const DropZone = () => {
  return (
    <div className="divInput">
      <div className='inputImage'>
        <h3> Escolha um brasão para esta cidade:</h3>     
            <input className="" id="fileSelect" type='file' accept=".jpeg, .jpg, .png"/>
      </div>
      {/* Pass the selectect or dropped files as props */}
    </div>
  );
};

export default DropZone;

const FilePreview = ({ fileData }) => {
  return (
    <div>
      <div>
        {/* loop over the fileData */}
        {fileData.  map((f) => {
          return (
            <>
              <ol>
                <li key={f.lastModified}>
                  {/* display the filename and type */}
                  <div key={f.name}>
                    {f.name}
                  </div>
                </li>
              </ol>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;
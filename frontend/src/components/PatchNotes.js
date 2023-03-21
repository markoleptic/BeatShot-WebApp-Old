const PatchNotes = () => {
  return (
    <>
      <div className="flex-container pn-container">
        <div className="content">
          <div className="content-header">
            <h2 className="pn-title">Patch Notes</h2>
          </div>
          <div className="content-main">
            <div className="pn-wrapper">
              <p className="fs-400 text-center text-lightgrey">
                Patch Notes will become available after BeatShot has entered
                Early Access. In the meantime you can check out the <a className="link text-white hover-blue" href="https://github.com/markoleptic/BeatShot">Github</a> for the project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PatchNotes;

// src/components/Bentobox.jsx
function Bentobox({ modules }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4">
      {modules.map((module, index) => (
        <div
          key={index}
          className={`module-${index} ${module.className} relative overflow-hidden group`}
        >
          {module.content}
        </div>
      ))}
    </div>
  );
}

export default Bentobox;

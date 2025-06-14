/* eslint-disable react/prop-types */
function Error({ error }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  );
}

export default Error;

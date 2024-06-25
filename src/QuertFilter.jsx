import { useRef, useState } from "react";

const attributes = [
  "container_id",
  "container_name",
  "severity_number",
  "body",
  "trace_id",
  "span_id",
  "trace_flags",
  "security_checks",
];

const operations = ["", "=", "!=", "IN", "NOT_IN", "LIKE"];

function QueryFiter() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAtt, setCurrAtt] = useState("");
  const [tags, setTags] = useState([]);
  const [oprAtt, setOprAtt] = useState("");

  const inputRef = useRef(null);

  const handleAttClick = (str) => {
    setCurrAtt(str);
    setIsOpen(false);
    setOprAtt(str);
  };

  const HandleOprClick = (op) => {
    let str = currentAtt + " " + op + " ";
    setCurrAtt(str);
  };

  const KeyDown = (e) => {
    if (e.key === "Enter") {
      setIsOpen(false);
      setTags((prevTags) => [...prevTags, currentAtt]);
      setCurrAtt("");
      setOprAtt("");
      if (inputRef.current) {
        inputRef.current.blur(); // Remove focus when Enter is pressed
      }
    }

    if (!isNaN(e.key)) {
      let str = currentAtt + e.key;
      setCurrAtt(str);
    }
  };

  const deleteTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black text-gray-300">
      <div className="w-[75%] ml-20 "> {/* Added mt-10 for top margin */}
        <div className="pl-2 relative">
          <input
            ref={inputRef}
            type="text"
            value={currentAtt}
            onKeyDown={KeyDown}
            placeholder={
              tags.length === 0
                ? "Search Filter: select options from suggested values, for IN/NOT IN operations - press ENTER after selecting options"
                : ""
            }
            className="p-3 w-[75%] ml-20 bg-gray-900 text-gray-400 focus:outline-none"
            onFocus={() => {
              if (currentAtt.length === 0) {
                setIsOpen(true);
              }
            }}
          />
          <div className="absolute ml-20  inset-y-0 left-0 flex items-center pl-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="m-1 flex items-center bg-gray-700 p-1 border rounded-sm"
              >
                {tag}
                <button
                  onClick={() => deleteTag(tag)}
                  className="ml-2 text-gray-400 hover:text-red-700"
                >
                  x
                </button>
              </span>
            ))}
          </div>

          {isOpen && (
            <div className="w-[75%]  ml-20 bg-gray-800 mt-2">
              {attributes.map((op, idx) => (
                <div key={idx} className="cursor-pointer pl-2 hover:bg-gray-700">
                  <button
                    onClick={() => handleAttClick(op)}
                    className="w-full mr-2 text-left"
                  >
                    {op}
                  </button>
                </div>
              ))}
            </div>
          )}
          {currentAtt.length > 0 && (
            <div className="w-[75%] ml-20 mr-2 bg-gray-800 mt-2">
              {operations.map((op, idx) => (
                <div key={idx} className="cursor-pointer pl-2 hover:bg-gray-700">
                  <button
                    onClick={() => HandleOprClick(op)}
                    className="w-full mr-2 text-left"
                  >
                    {oprAtt} {op}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QueryFiter;

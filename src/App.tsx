import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'; 
import './App.css';

function App() {
  const [code, setCode] = useState<string>("");
  const [theme, setTheme] = useState<string>("Default theme");
  const elementRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setTheme(value);
    setIsOpen(false);
  };

  const options = [
    { label: "Default theme", value: "bg-gradient-to-r from-indigo-500 to-purple-500" },
    { label: "Sunset", value: "bg-gradient-to-r from-red-500 to-orange-500" },
    { label: "Poppy", value: "bg-gradient-to-r from-rose-400 to-red-500" },
    { label: "Rosebud", value: "bg-gradient-to-r from-pink-500 to-rose-500" },
    { label: "Darkness", value: "bg-gradient-to-r from-slate-900 to-slate-700" },
    { label: "Metal", value: "bg-gradient-to-r from-slate-500 to-slate-800" },
  ];

  const htmlToImageConvert = () => {
    //@ts-ignore
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "code.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
        console.log(elementRef.current);
      });
  };

  return (
    <>
      <div className='h-screen w-full bg-black bg-grid-white/[0.2] grid grid-cols-2 max-sm:grid-cols-1 overflow-auto'>
        <div className='flex items-center justify-center text-white max-sm:p-5'>
          <div className='box flex flex-col space-y-5'>
            <div className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-4 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                <textarea
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  className='w-96 p-5 border-purple-500 bg-black rounded-xl outline-none'
                  placeholder='Enter your code snippet here'
                  rows={10}
                />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <button onClick={htmlToImageConvert} className="p-[3px] w-52 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                  Download
                </div>
              </button>
              <div className="p-[3px] w-52 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                  <div
                    className="bg-black text-white outline-none w-full cursor-pointer rounded-[6px]"
                    onClick={() => setIsOpen(!isOpen)}
                    role="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                  >
                    {options.find(option => option.value === theme)?.label || 'Select Theme'}
                  </div>
                  {isOpen && (
                    <ul className="absolute bg-black text-white mt-2 w-full rounded-md shadow-lg z-10">
                      {options.map((option, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer flex items-center"
                          onClick={() => handleSelect(option.value)}
                          role="option"
                          aria-selected={theme === option.value}
                        >
                          <span
                            className={`inline-block w-2 h-2 mr-2 rounded-full ${option.value}`}
                          ></span>
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='flex flex-col items-center space-y-5 p-8 shadow-lg rounded-lg'>
            {code && (
              <>
                <div className={`p-8 w-full max-w-2xl rounded-md ${theme}`} ref={elementRef}>
                  <SyntaxHighlighter
                    language="python"
                    style={darcula} 
                    customStyle={{
                      backgroundColor: '#1E293B',
                      borderRadius: '8px',
                      padding: '16px'
                    }}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

function App() {
  const [code, setCode] = useState<string>("");
  const [theme, setTheme] = useState<string>();
  const [language, setLanguage] = useState<string>()
  const elementRef = useRef(null);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [islanguageOpen, setIsLanguageOpen] = useState(false)

  const handleSelect = (value: string) => {
    setTheme(value);
    setIsThemeOpen(false);
  };
  const handleLanugageSelect = (value: string) => {
    setLanguage(value);
    setIsLanguageOpen(false);
  };

  const options = [
    { label: "Default theme", value: "bg-gradient-to-r from-indigo-500 to-purple-500" },
    { label: "Sunset", value: "bg-gradient-to-r from-red-500 to-orange-500" },
    { label: "Poppy", value: "bg-gradient-to-r from-rose-400 to-red-500" },
    { label: "Rosebud", value: "bg-gradient-to-r from-pink-500 to-rose-500" },
    { label: "Darkness", value: "bg-gradient-to-r from-slate-900 to-slate-700" },
    { label: "Metal", value: "bg-gradient-to-r from-slate-500 to-slate-800" },
  ];

  const languages = [
    'python',
    'javascript',
    'java',
    'c',
    'cpp',
    'csharp',
    'css',
    'go',
    'html',
    'json',
    'kotlin',
    'markdown',
    'php',
    'ruby',
    'rust',
    'scala',
    'sql',
    'swift',
    'typescript',
    'xml'
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
    <div className='h-screen w-full overflow-auto bg-black bg-grid-white/[0.2]'>
      <div className='border-b flex items-center justify-between max-sm:gap-5 z-50 bg-black bg-grid-white/[0.2]  border-purple-500 sticky top-0 py-5 px-16 max-sm:px-8 '>
        <p className="font-mono text-3xl max-sm:text-2xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">CODE</span>
          <span className="bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">CAPT</span>
          <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">URE</span>
        </p>
        <p className="font-mono text-purple-500 text-lg max-sm:text-xs max-sm:text-nowrap font-bold">
         Made with ❤️ By Mihir
        </p>
      </div>
      <div className='h-auto w-full grid grid-cols-2 max-sm:grid-cols-1 overflow-auto max-sm:h-auto'>

        <div className='flex items-center justify-center text-white'>
          <div className='flex flex-col max-sm:items-center max-sm:justify-center space-y-5 max-sm:mt-16'>
            <div className="p-[3px] max-sm:w-96 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-4 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                <textarea
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  className='w-full p-5  bg-black rounded-xl outline-none'
                  placeholder='Enter your code snippet here'
                  rows={10}
                />
              </div>
            </div>
            <div className='flex items-center max-sm:flex-col max-sm:space-y-5 justify-between space-x-2'>
              {/* download button */}
              <button onClick={htmlToImageConvert} className="p-[3px] w-52 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                  Download
                </div>
              </button>
              {/* Theme options */}
              <div className="p-[3px] w-52 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                  <div
                    className="bg-black text-white text-center outline-none w-full cursor-pointer rounded-[6px]"
                    onClick={() => setIsThemeOpen(!isThemeOpen)}
                    role="button"
                    aria-haspopup="listbox"
                    aria-expanded={isThemeOpen}
                  >
                    {options.find(option => option.value === theme)?.label || 'Select Theme'}
                  </div>
                  {isThemeOpen && (
                    <ul className="absolute bg-black text-white overflow-y-auto h-36 mt-2 w-full rounded-md shadow-lg z-10">
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
              {/* Language Options */}
              <div className="p-[3px] w-52 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                  <div
                    className="bg-black text-center text-white outline-none w-full cursor-pointer rounded-[6px]"
                    onClick={() => setIsLanguageOpen(!islanguageOpen)}
                    role="button"
                    aria-haspopup="listbox"
                    aria-expanded={islanguageOpen}
                  >
                    {languages.find(lang => language === lang) || 'Select Language'}
                  </div>
                  {islanguageOpen && (
                    <ul className="absolute bg-black text-white mt-2 w-full overflow-y-auto h-36 rounded-md shadow-lg z-10">
                      {languages.map((option, index) => (
                        <li
                          key={index}
                          className="p-2 cursor-pointer flex items-center"
                          onClick={() => handleLanugageSelect(option)}
                          role="option"
                          aria-selected={theme === option}
                        >
                          <span
                            className={`inline-block w-2 h-2 mr-2 rounded-full ${option}`}
                          ></span>
                          {option}
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
          <div className='flex flex-col items-center space-y-5 p-4 shadow-lg rounded-lg'>
            {code && (
              <>
                <div className={`p-6 w-full max-w-2xl rounded-md ${theme ? theme : "bg-gradient-to-r from-indigo-500 to-purple-500"}`} ref={elementRef}>
                  <SyntaxHighlighter
                    language={language}
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
    </div>
  );
}

export default App;

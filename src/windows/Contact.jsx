import WindowControls from "#components/WindowControls";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <>
      {/* ── 1. Window Header ── */}
      <div id="window-header">
        <WindowControls target="contact" />
   <h2 className=" hidden md:block font-bold text-sm text-center ">Contact Me</h2>
      
      </div>
    
      {/* ── 2. Content ── */}
      <div className="overflow-y-auto max-h-[calc(100dvh-56px)] md:max-h-none p-5 md:p-6 space-y-4">

        {/* Profile */}
        <div className="flex items-center gap-4">
          <img
            src='/images/Profile.jpg'
            alt="adrian"
            className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-base md:text-xl">Let's Connect</h3>
            <p className="text-sm text-gray-500 mt-1">
              Got an idea? A bug to squash? or just wanna talk tech?
     
            </p>
          </div>
        </div>

     

        {/* Socials */}
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socials.map(({ id, bg, link, icon, text }) => (
            <li
              key={id}
              style={{ backgroundColor: bg }}
              className="rounded-lg p-4 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              
               <a href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3"
              >
                 <img src={icon} alt={text} className="size-5" />
                <p className="font-semibold text-sm text-white truncate">{text}</p>
              </a>
            </li>
          ))}
        </ul>

      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
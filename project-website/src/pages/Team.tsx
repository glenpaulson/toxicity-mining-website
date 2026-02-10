import { Github, Linkedin } from "lucide-react";
import glenImg from "../assets/glen.png";
import himanshuImg from "../assets/himanshu.png";
import rahulImg from "../assets/rahul.png";
import augustineImg from "../assets/augustine.png";

const Team = () => {
  const teamMembers = [
    {
      name: "Rahul Hipparkar",
      role: "Modelling Lead",
      image: rahulImg,
      bio: "Kaggle Expert with 3.5+ years of experience. Specializes in automation, deep learning, and NLP using Python, PyTorch, and TensorFlow.",
      social: {
        linkedin: "https://www.linkedin.com/in/rahul-hipparkar/",
        github: "https://github.com/RahulHipparkar",
      },
    },
    {
      name: "Himanshu Jain",
      role: "Data Mining Lead",
      image: himanshuImg,
      bio: "Focused on applied AI and analytics. Project portfolio spans healthcare computer vision and social media NLP.",
      social: {
        linkedin: "https://www.linkedin.com/in/himanshu-jain-559335222",
        github: "https://github.com/himanshumjain15",
      },
    },
    {
      name: "Augustine Joy",
      role: "Data Lead/Research ",
      image: augustineImg,
      bio: "Over three years of experience at IBM. Specializes in machine learning and deep learning using Python, SQL, and PyTorch.",
      social: {
        linkedin: "https://www.linkedin.com/in/augustine-antony-joy/",
        github: "https://github.com/augustineantonyjoy",
      },
    },
    {
      name: "Glen Vadakkoott",
      role: "Data/AI/Visualization Lead",
      image: glenImg,
      bio: "Specializes in ML and deep learning, with hands-on experience in Python, SQL, and frameworks like TensorFlow and PyTorch. Over 4 yrs exp in full-stack development.",
      social: {
        linkedin: "https://www.linkedin.com/in/glen-paulson-v/",
        github: "https://github.com/glenpaulson",
      },
    },
  ];

  return (
    <div className="bg-[#EBEBEB] min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#1a1a1a] mb-4">
            Meet the Team
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            "Decoding linguistic patterns of online toxicity to create safer
            digital spaces."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center"
            >
              <div className="mb-4 relative">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold tracking-widest uppercase mb-3">
                {member.role}
              </span>

              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
                {member.bio}
              </p>

              <div className="flex gap-4 mt-auto pt-4 border-t border-gray-100 w-full justify-center">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-700 transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;

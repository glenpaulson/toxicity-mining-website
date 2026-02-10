import { useState } from "react";
import { HelpCircle, Target, X } from "lucide-react";
import pyramidImg from "../assets/pyramid-of-hate.png";

const Proposal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const researchQuestions = [
    "What proportion of social media comments are classified as toxic versus non-toxic?",
    "Are Identity based hate speech comments more severe than general offensive comments?",
    "How does frequency of toxicity vary over time?",
    "What type of toxicity (insult, threat, etc) occurs the most?",
    "Which specific keywords are the strongest predictors of severe toxicity?",
    "Does the model misclassify non english speaker’s text more often?",
    "Is there a relationship between toxicity and number of upvotes on reddit?",
    "Is the model able to separate sarcasm from actual toxicity?",
    "Which subreddits contain the highest concentration of toxic posts?",
    "To what extent can Transformer-based models differentiate between generic offensive language and targeted hate speech?",
  ];

  return (
    <div className="bg-[#EBEBEB] min-h-screen pt-32 pb-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#1a1a1a] mb-6">
            Proposal Overview
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            A summary of the research scope, hypothesis, and the core questions
            our dataset analysis aims to answer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-300 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Target className="text-black-600" size={24} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  Scope & Objectives
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Primary Goal</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To identify patterns of toxicity that evade traditional
                    keyword filters and understand the linguistic evolution of
                    hate speech.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">Requirements</h4>
                  <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                    <li>Specific and relevant to dataset</li>
                    <li>Extract insights/patterns</li>
                    <li>Diverse (descriptive/predictive)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-300 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                Conceptual Model
              </h3>
              <figure>
                <div
                  className="overflow-hidden rounded-lg cursor-zoom-in group"
                  onClick={() => setIsModalOpen(true)}
                >
                  <img
                    src={pyramidImg}
                    alt="Pyramid of Hate"
                    className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="text-xs text-gray-500 mt-4 leading-relaxed italic">
                  (Click to zoom) <br />
                  Figure 1: The Pyramid of Hate illustrates how biased behaviors
                  can escalate from prejudice to violence if unchecked. Source:{" "}
                  <a
                    href="https://view.genially.com/5e6767cc45d9ae0fc60d9488/horizontal-infographic-diagrams-pyramid-of-hate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                  >
                    Anti-Defamation League
                  </a>
                  .
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 border border-gray-300 shadow-sm rounded-2xl">
              <div className="flex items-center gap-3 mb-10 border-b border-gray-100 pb-6">
                <HelpCircle className="text-gray-400" size={24} />
                <h2 className="text-2xl font-medium text-gray-900">
                  Research Questions
                </h2>
              </div>
              <div className="space-y-0 divide-y divide-gray-100">
                {researchQuestions.map((question, index) => (
                  <div key={index} className="py-6 flex gap-6 items-start">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 font-bold text-sm">
                      {index + 1}
                    </span>
                    <p className="text-gray-800 text-lg leading-relaxed font-light">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={32} />
          </button>
          <img
            src={pyramidImg}
            alt="Pyramid of Hate - Expanded"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Proposal;

import { HelpCircle, Target } from "lucide-react";

const Proposal = () => {
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
    <div className="bg-[#EBEBEB] min-h-screen pt-32 pb-20 px-6">
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
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl border border-gray-300 shadow-sm sticky top-32">
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
    </div>
  );
};

export default Proposal;

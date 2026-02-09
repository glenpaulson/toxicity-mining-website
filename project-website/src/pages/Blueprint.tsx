import { Check } from "lucide-react";

const Blueprint = () => {
  const milestones = [
    {
      id: 1,
      title: "Project Framing",
      date: "Feb 9",
      status: "completed",
      description: "Website Launch & Scope Definition",
    },
    {
      id: 2,
      title: "Data Preparation",
      date: "Mar 6",
      status: "upcoming",
      description: "Collection, Cleaning & Labeling",
    },
    {
      id: 3,
      title: "Model Implementation",
      date: "Apr 3",
      status: "upcoming",
      description: "Training, Tuning & Testing",
    },
    {
      id: 4,
      title: "Conclusion & Report",
      date: "Apr 17",
      status: "upcoming",
      description: "Final Results & Presentation",
    },
  ];

  return (
    <div>
      <div className="bg-[#EBEBEB] text-[#1a1a1a] px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Project Roadmap
            </h2>
            <p className="text-gray-500 text-lg">
              Key delivery milestones and deadlines
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-300 rounded-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              {milestones.map((milestone, index) => {
                const isCompleted = milestone.status === "completed";

                return (
                  <div
                    key={milestone.id}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Circle Indicator (Static - No Hover Animations) */}
                    <div
                      className={`relative z-10 w-16 h-16 rounded-full border-4 flex items-center justify-center mb-6 
                      ${
                        isCompleted
                          ? "bg-black border-[#EBEBEB] text-white shadow-lg"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <Check size={28} strokeWidth={3} />
                      ) : (
                        <span className="font-medium text-lg">
                          0{index + 1}
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase
                        ${
                          isCompleted
                            ? "bg-gray-300 text-black"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {milestone.date} {isCompleted && "• Done"}
                      </span>

                      <h3 className="text-xl font-bold text-gray-900">
                        {milestone.title}
                      </h3>

                      <p className="text-gray-500 text-sm leading-relaxed px-2">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#111111] text-gray-300 px-6 py-24 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-white text-5xl md:text-6xl font-medium tracking-tight mb-8">
              Technical Execution
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-4xl">
              This project aims to mine, analyze, and model hate speech and
              toxic language patterns in social media text using Natural
              Language Processing (NLP) and data mining techniques. The analysis
              is performed at the post level and focuses on discovering
              linguistic patterns rather than moderation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div className="space-y-12">
              <h3 className="text-white text-2xl font-bold uppercase tracking-widest border-b border-gray-800 pb-4">
                Phase 1: Data Ecosystem
              </h3>

              <div>
                <h4 className="text-white text-xl font-medium mb-3">
                  Data Sources
                </h4>
                <p className="leading-relaxed text-justify hyphens-auto">
                  The primary dataset used in this project is the Google Jigsaw
                  Civil Comments dataset, which contains large-scale, annotated
                  online comments with toxicity-related labels. This dataset
                  serves as the main source for model training. Reddit data will
                  be used as a secondary data source, collected using PRAW.
                </p>
              </div>

              <div>
                <h4 className="text-white text-xl font-medium mb-3">
                  Labeling Strategy
                </h4>
                <p className="leading-relaxed text-justify hyphens-auto">
                  The Google Jigsaw dataset provides human-annotated toxicity
                  scores, which will be converted into binary labels using
                  predefined thresholds. For Reddit data, weak labels will be
                  assigned based on subreddit context.
                </p>
              </div>

              <div>
                <h4 className="text-white text-xl font-medium mb-3">
                  Exploratory Data Analysis (EDA)
                </h4>
                <p className="leading-relaxed text-justify hyphens-auto">
                  EDA includes analysis of dataset size, class distribution,
                  text length statistics, frequent unigrams and bigrams,
                  profanity usage, capitalization patterns, and punctuation
                  intensity.
                </p>
              </div>

              <div>
                <h4 className="text-white text-xl font-medium mb-3">
                  Data Preprocessing
                </h4>
                <p className="leading-relaxed text-justify hyphens-auto">
                  Preprocessing steps include lowercasing, removal of URLs and
                  markdown, filtering out deleted posts, tokenization, stop-word
                  removal, and optional lemmatization.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="text-white text-2xl font-bold uppercase tracking-widest border-b border-gray-800 pb-4">
                Phase 2: Modeling & Intelligence
              </h3>

              <div>
                <h4 className="text-white text-xl font-medium mb-3">
                  Feature Engineering
                </h4>
                <p className="leading-relaxed text-justify hyphens-auto">
                  Text features are extracted using TF-IDF representations.
                  TruncatedSVD is applied to reduce dimensionality. Additional
                  lexical features include profanity counts and punctuation
                  intensity.
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h4 className="text-blue-400 text-xl font-bold mb-3">
                  Modeling Strategy
                </h4>
                <p className="leading-relaxed text-justify hyphens-auto mb-4">
                  Baseline machine learning models such as Naive Bayes, Logistic
                  Regression and Linear SVM are trained using TF-IDF features.
                </p>
                <p className="text-white italic">
                  A transformer-based model, DistilBERT, is fine-tuned on
                  labeled data to capture contextual and semantic information.
                </p>
              </div>

              <div>
                <h4 className="text-white text-xl font-medium mb-3">
                  Pattern Mining
                </h4>
                <p className="leading-relaxed text-justify hyphens-auto">
                  Clustering techniques such as KMeans or HDBSCAN are applied to
                  identify different types of toxic language patterns.
                  Association rule mining using FP-Growth is performed.
                </p>
              </div>

              <div>
                <h4 className="text-white text-xl font-medium mb-3">
                  Evaluation
                </h4>
                <p className="leading-relaxed text-justify hyphens-auto">
                  Model performance is evaluated using Precision, Recall,
                  F1-score, and ROC-AUC metrics.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                Ethical Considerations
              </h4>
              <p className="text-sm leading-relaxed text-gray-500">
                The project uses only publicly available data and avoids
                user-level profiling or identity inference. The analysis does
                not attempt to infer intent or make moderation decisions.
              </p>
            </div>

            <div>
              <h4 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                Project Timeline
              </h4>
              <p className="text-sm leading-relaxed text-gray-500">
                Data collection and initial EDA will be completed by March 6.
                Preprocessing, feature engineering, and model training will
                follow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blueprint;

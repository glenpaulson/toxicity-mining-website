const Blueprint = () => {
  return (
    <div className="bg-[#111111] min-h-screen pt-20">
      <div className="text-gray-300 px-6 py-12">
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-white text-5xl md:text-6xl font-medium tracking-tight mb-8">
            Project Blueprint
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-4xl">
            This project aims to mine, analyze, and model hate speech and toxic
            language patterns in social media text using Natural Language
            Processing (NLP) and data mining techniques. The analysis is
            performed at the post level and focuses on discovering linguistic
            patterns, building predictive models, and generating interpretable
            insights rather than moderation or user profiling.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
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
                serves as the main source for model training, benchmarking, and
                evaluation. Reddit data will be used as a secondary data source,
                collected using the official Reddit API (PRAW), to analyze
                real-world, noisy social media text and validate model
                performance. The Reddit dataset will include post titles, body
                text, subreddit names, and timestamps.
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
                assigned based on subreddit context, where posts from
                toxicity-related subreddits are treated as toxic and posts from
                neutral subreddits as non-toxic. These weak labels are
                probabilistic and may contain noise.
              </p>
            </div>

            <div>
              <h4 className="text-white text-xl font-medium mb-3">
                Exploratory Data Analysis (EDA)
              </h4>
              <p className="leading-relaxed text-justify hyphens-auto">
                Exploratory Data Analysis is performed on the raw collected data
                prior to preprocessing to understand dataset characteristics and
                data quality. EDA includes analysis of dataset size, class
                distribution, text length statistics, frequent unigrams and
                bigrams, profanity usage, capitalization patterns, and
                punctuation intensity. Dimensionality reduction techniques will
                be used for visualization to assess separability between toxic
                and non-toxic samples. Insights gained from EDA will guide
                preprocessing and feature engineering decisions.
              </p>
            </div>

            <div>
              <h4 className="text-white text-xl font-medium mb-3">
                Data Preprocessing
              </h4>
              <p className="leading-relaxed text-justify hyphens-auto">
                Based on insights from EDA, preprocessing steps are applied to
                clean and normalize the text data. These steps include
                lowercasing, removal of URLs and markdown, filtering out deleted
                or empty posts, tokenization, stop-word removal, and optional
                lemmatization while preserving negations. For Reddit data, post
                titles and body text are combined into a single text field.
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
                Text features are extracted using TF-IDF representations with
                unigrams and bigrams. TruncatedSVD is applied to reduce
                dimensionality and enable efficient tree-based modeling.
                Additional engineered lexical features include profanity and
                slur counts, capitalization ratios, punctuation intensity, and
                second-person pronoun frequency.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h4 className="text-blue-400 text-xl font-bold mb-3">
                Modeling Strategy
              </h4>
              <p className="leading-relaxed text-justify hyphens-auto mb-4">
                Baseline machine learning models such as Naive Bayes, Logistic
                Regression and Linear SVM are trained using TF-IDF features. A
                LightGBM classifier is trained on SVD-reduced TF-IDF features
                combined with engineered lexical features to capture non-linear
                relationships.
              </p>
              <p className="text-white italic">
                A transformer-based model, DistilBERT, is fine-tuned on labeled
                data to capture contextual and semantic information.
              </p>
            </div>

            <div>
              <h4 className="text-white text-xl font-medium mb-3">
                Pattern Mining
              </h4>
              <p className="leading-relaxed text-justify hyphens-auto">
                Clustering techniques such as KMeans or HDBSCAN are applied to
                identify different types of toxic language patterns. Association
                rule mining using FP-Growth is performed to discover
                interpretable word and phrase patterns associated with toxicity.
              </p>
            </div>

            <div>
              <h4 className="text-white text-xl font-medium mb-3">
                Evaluation
              </h4>
              <p className="leading-relaxed text-justify hyphens-auto">
                Model performance is evaluated using Precision, Recall,
                F1-score, and ROC-AUC metrics. Comparative analysis is conducted
                across baseline models and advanced models on both the primary
                and secondary datasets.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              Ethical Considerations
            </h4>
            <p className="text-sm leading-relaxed text-gray-500">
              The project uses only publicly available data and avoids
              user-level profiling or identity inference. The analysis does not
              attempt to infer intent or make moderation decisions. Limitations
              include the presence of weak labels in Reddit data and challenges
              in interpreting sarcasm and irony.
            </p>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              Project Timeline
            </h4>
            <p className="text-sm leading-relaxed text-gray-500">
              Data collection and initial EDA will be completed by March 6.
              Preproceesing, feature engineering, model training, evaluation,
              and reporting will follow according to course milestones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blueprint;

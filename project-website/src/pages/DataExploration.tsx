import { useState } from "react";
import { Database, Filter, ShieldAlert, X, BarChart2 } from "lucide-react";

import vis1Img from "../assets/class_distribution_comparison.png";
import vis2Img from "../assets/text_length_by_label.png";
import vis3Img from "../assets/text_length_distribution_by_dataset.png";
import vis4Img from "../assets/top_5_unigram_freq.png";
import vis5Img from "../assets/toxic_label_correlation.png";
import vis6Img from "../assets/toxicity_score_distribution.png";
import vis7Img from "../assets/word_cloud_comparison.png";
import vis8Img from "../assets/vocabulary_overlap.png";
import vis9Img from "../assets/t_sne_visualisation.png";
import vis10Img from "../assets/k_means_cluster_analysis.png";

interface ActiveImage {
  src: string;
  alt: string;
  caption: string;
}

const DataExploration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);

  const openModal = (imgSrc: string, altText: string, caption: string) => {
    setActiveImage({ src: imgSrc, alt: altText, caption });
    setIsModalOpen(true);
  };

  const cleaningStats = [
    {
      name: "Jigsaw Civil Comments",
      raw: "1,804,874",
      dupes: "17,955",
      short: "21,588",
      clean: "1,765,331",
    },
    {
      name: "TweetEval Hate",
      raw: "9,000",
      dupes: "12",
      short: "34",
      clean: "8,954",
    },
  ];

  // We assign the imported image variables directly to the 'src' property
  const visualizations = [
    {
      id: 1,
      title: "Class Distribution",
      desc: "Highlights the massive 91.7% class imbalance in the Jigsaw dataset.",
      src: vis1Img,
      span: "col-span-1",
    },
    {
      id: 2,
      title: "Text Length by Dataset",
      desc: "Violin plot comparing comment lengths between forums and tweets.",
      src: vis2Img,
      span: "col-span-1",
    },
    {
      id: 3,
      title: "Text Length by Label",
      desc: "Shows word count alone is not a useful feature for detecting toxicity.",
      src: vis3Img,
      span: "col-span-1",
    },
    {
      id: 4,
      title: "Toxicity Score Histogram",
      desc: "Bimodal shape confirming 0.5 is a reasonable binarization threshold.",
      src: vis4Img,
      span: "col-span-1",
    },
    {
      id: 5,
      title: "Feature Correlation",
      desc: "Toxicity and insult have a very strong correlation (r=0.93).",
      src: vis5Img,
      span: "col-span-1",
    },
    {
      id: 6,
      title: "Top 5 Unigrams",
      desc: "'Stupid' comes first, highlighting personal insults over organized hate.",
      src: vis6Img,
      span: "col-span-1",
    },
    {
      id: 7,
      title: "Word Cloud Comparison",
      desc: "Neutral vs Hate content vocabularies side-by-side.",
      src: vis7Img,
      span: "md:col-span-2 lg:col-span-2",
    },
    {
      id: 8,
      title: "Vocabulary Overlap",
      desc: "Venn diagram showing only 2.6% overlap between Jigsaw and Twitter.",
      src: vis8Img,
      span: "md:col-span-2 lg:col-span-1",
    },
    {
      id: 9,
      title: "t-SNE Embeddings",
      desc: "Shows a large non-toxic cluster and a smaller toxic cluster.",
      src: vis9Img,
      span: "md:col-span-2 lg:col-span-2",
    },
    {
      id: 10,
      title: "KMeans Cluster",
      desc: "KMeans with k=2 accurately matches the natural class split.",
      src: vis10Img,
      span: "col-span-1",
    },
  ];

  return (
    <div>
      {/* Top Light Section: Collection & Cleaning */}
      <div className="bg-[#EBEBEB] min-h-screen pt-32 pb-20 px-6 relative text-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Data Exploration
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Documenting our dynamic data collection via HuggingFace APIs,
              rigorous cleaning procedures, and comprehensive exploratory data
              analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Data Acquisition */}
            <div className="bg-white p-8 rounded-2xl border border-gray-300 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Database className="text-gray-400" size={24} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  Data Acquisition
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Primary Sources
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Data was collected dynamically using the HuggingFace
                    Datasets API to satisfy project requirements[cite: 38, 39].
                    We selected two highly relevant datasets:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                    <li>
                      <strong>Google Civil Comments (Jigsaw):</strong> 1,804,874
                      rows of forum comments with toxicity scores[cite: 40].
                    </li>
                    <li>
                      <strong>TweetEval Hate:</strong> 9,000 rows of tweets with
                      binary labels[cite: 40].
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">
                    API Challenges & Justification
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We initially configured PRAW to include the Reddit API[cite:
                    42, 43]. However, Reddit's 2023 API rule changes restricted
                    free-tier access[cite: 44]. Relying purely on the
                    HuggingFace API guarantees dynamic access while capturing
                    the necessary cross-platform vocabulary gap between long
                    forum comments and short tweets[cite: 46, 48].
                  </p>
                </div>
              </div>
            </div>

            {/* Data Cleaning */}
            <div className="bg-white p-8 rounded-2xl border border-gray-300 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="text-gray-400" size={24} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  Cleaning & Preprocessing
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  The initial datasets contained zero null values[cite: 56]. Our
                  cleaning pipeline focused on eliminating exact duplicates to
                  prevent model over-learning, and filtering out records with
                  fewer than 3 words[cite: 60, 61, 63].
                </p>

                {/* Before/After Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600 border-collapse">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3">Dataset</th>
                        <th className="px-4 py-3">Raw</th>
                        <th className="px-4 py-3">Cleaned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cleaningStats.map((stat, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {stat.name}
                          </td>
                          <td className="px-4 py-3 text-red-500">{stat.raw}</td>
                          <td className="px-4 py-3 text-green-600 font-bold">
                            {stat.clean}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Feature Engineering
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Text was preprocessed via contraction expansion, URL
                    removal, and stop-word filtering[cite: 12]. We applied
                    TF-IDF vectorization and used <strong>Truncated SVD</strong>{" "}
                    (ideal for sparse matrices) to reduce our feature space from
                    50,000 down to 200 dimensions[cite: 13, 104, 105].
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visualizations Gallery */}
          <div className="mb-10 mt-20">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-300 pb-6">
              <BarChart2 className="text-gray-500" size={28} />
              <h2 className="text-3xl font-medium text-gray-900">
                Visual Diagnostics & Insights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visualizations.map((vis) => (
                <div
                  key={vis.id}
                  className={`bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col ${vis.span}`}
                >
                  <div
                    className="h-48 bg-gray-100 flex items-center justify-center cursor-zoom-in group relative overflow-hidden"
                    onClick={() => openModal(vis.src, vis.title, vis.desc)}
                  >
                    {/* Replaced placeholder with an actual image tag */}
                    <img
                      src={vis.src}
                      alt={vis.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/400x200?text=Image+Not+Found";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
                        View
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {vis.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {vis.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dark Section: Ethics & Limitations */}
      <div className="bg-[#111111] text-gray-300 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Ethics, Bias & Limitations
            </h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-4xl">
              Acknowledging the real-world complexities and potential harms in
              toxicity mining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <ShieldAlert className="text-yellow-500/80 mb-4" size={32} />
              <h4 className="text-white text-xl font-bold border-b border-gray-800 pb-2">
                Demographic Bias
              </h4>
              <p className="text-sm leading-relaxed text-gray-400">
                NLP toxicity models are known to disproportionately flag
                minority community language, including AAVE and in-group
                slang[cite: 243]. We must monitor this in Milestone 3 by
                disaggregating metrics by identity-term presence[cite: 244].
              </p>
            </div>

            <div className="space-y-4">
              <ShieldAlert className="text-yellow-500/80 mb-4" size={32} />
              <h4 className="text-white text-xl font-bold border-b border-gray-800 pb-2">
                Annotation Subjectivity
              </h4>
              <p className="text-sm leading-relaxed text-gray-400">
                Jigsaw toxicity scores are crowd-sourced from human raters with
                varying cultural backgrounds[cite: 241]. Binarizing at our 0.5
                threshold unavoidably discards annotator uncertainty[cite: 242].
              </p>
            </div>

            <div className="space-y-4">
              <ShieldAlert className="text-yellow-500/80 mb-4" size={32} />
              <h4 className="text-white text-xl font-bold border-b border-gray-800 pb-2">
                Missing Context
              </h4>
              <p className="text-sm leading-relaxed text-gray-400">
                Tweets are often replies to images, videos, or prior threads
                unavailable in text-only datasets[cite: 245]. Without this
                context, instances of sarcasm and irony may be miscategorized by
                the model[cite: 246].
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Repaired Image Modal */}
      {isModalOpen && activeImage && (
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
          <div
            className="flex flex-col items-center justify-center max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl bg-white"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/800x600?text=Image+Not+Found";
              }}
            />

            <p className="text-white text-center mt-6 text-lg max-w-2xl font-light">
              {activeImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataExploration;

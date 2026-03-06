import { useState } from "react";
import {
  Database,
  Filter,
  ShieldAlert,
  X,
  BarChart2,
  CheckCircle2,
} from "lucide-react";

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

  const visualizations = [
    {
      id: 1,
      title: "Class Distribution Comparison",
      desc: "Reveals a heavy 91.7% class imbalance in the Jigsaw dataset, with the combined EDA dataset sitting at 74.8% non-toxic.",
      src: vis1Img,
      span: "col-span-1",
    },
    {
      id: 2,
      title: "Text Length by Label",
      desc: "Demonstrates that toxic and non-toxic texts have nearly identical median word counts (34 vs 36), showing length is not a strong predictor.",
      src: vis2Img,
      span: "col-span-1",
    },
    {
      id: 3,
      title: "Text Length by Dataset",
      desc: "Violin plot illustrating the domain gap: Jigsaw comments are much longer (median 36 words) compared to Twitter tweets (median 19 words).",
      src: vis3Img,
      span: "col-span-1",
    },
    {
      id: 4,
      title: "Top 5 Unigrams",
      desc: "Shows 'stupid' is the most frequent word in hate content, indicating toxicity is often driven by direct personal insults rather than organized hate.",
      src: vis4Img,
      span: "col-span-1",
    },
    {
      id: 5,
      title: "Toxicity Feature Correlation",
      desc: "Heatmap revealing a very strong correlation (r=0.93) between general toxicity and insults, while threats remain largely independent.",
      src: vis5Img,
      span: "col-span-1",
    },
    {
      id: 6,
      title: "Toxicity Score Distribution",
      desc: "Histogram showing a bimodal shape, confirming that using a 0.5 threshold for binarizing Jigsaw labels is a sound approach.",
      src: vis6Img,
      span: "col-span-1",
    },
    {
      id: 7,
      title: "Word Cloud Comparison",
      desc: "Contrasts the aggressive vocabulary of hate content with the neutral, policy-oriented terminology found in non-hate comments.",
      src: vis7Img,
      span: "md:col-span-2 lg:col-span-2",
    },
    {
      id: 8,
      title: "Vocabulary Overlap",
      desc: "Venn diagram exposing a mere 2.6% overlap in shared words between the Jigsaw and Twitter datasets.",
      src: vis8Img,
      span: "md:col-span-2 lg:col-span-1",
    },
    {
      id: 9,
      title: "t-SNE Embeddings",
      desc: "Visualizes a large non-toxic cluster and a smaller toxic cluster that are not cleanly separated linearly, supporting the use of non-linear models.",
      src: vis9Img,
      span: "md:col-span-2 lg:col-span-2",
    },
    {
      id: 10,
      title: "KMeans Cluster Analysis",
      desc: "Shows that setting k=2 yields the best silhouette score and accurately reflects the natural toxic vs. non-toxic groupings in the data.",
      src: vis10Img,
      span: "col-span-1",
    },
  ];

  return (
    <div>
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
            <div className="bg-white p-8 rounded-2xl border border-gray-300 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Database className="text-gray-400" size={24} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  Data Collection
                </h3>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">
                    Key Steps in Data Collection
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Selected the Hugging Face Datasets API to satisfy the
                        dynamic data collection requirement.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Extracted Jigsaw Civil Comments containing roughly 1.8
                        million records and the TweetEval Hate dataset with
                        9,000 records.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Attempted to integrate the Reddit API using PRAW, but
                        recent changes to their developer access rules made
                        free-tier collection impractical.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Evaluated alternative sources like the YouTube Data API,
                        but rejected them due to restrictive daily quota limits.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-indigo-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-800 font-medium text-sm leading-relaxed">
                        Because Reddit API access was denied, we will be
                        proceeding with web scraping to collect Reddit data in
                        the next phase to ensure we capture a diverse
                        cross-platform vocabulary.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-300 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="text-gray-400" size={24} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  Cleaning & Preprocessing
                </h3>
              </div>

              <div className="space-y-6 flex-1">
                <p className="text-gray-600 text-sm leading-relaxed">
                  The preprocessing pipeline focused on ensuring high data
                  quality by removing noise while preserving natural text
                  variations.
                </p>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">
                    Key Steps Executed
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <strong>Missing Values:</strong> Verified dataset
                        completeness; an initial quality assessment confirmed
                        zero null or missing values across both primary
                        datasets.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <strong>Duplicate and Consistency Checks:</strong>{" "}
                        Eliminated exact duplicate rows to prevent model
                        over-learning and removed unusually short texts (fewer
                        than three words). Binarized continuous Jigsaw toxicity
                        scores using a 0.5 threshold to harmonize with the
                        Twitter dataset's label scheme.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <strong>Outlier Treatment:</strong> Conducted IQR-based
                        outlier detection on word counts; deliberately retained
                        unusually long comments to preserve real-world writing
                        patterns.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <strong>Data Transformations:</strong> Standardized text
                        by expanding contractions, converting to lowercase,
                        removing URLs, and filtering out standard English
                        stop-words.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <strong>Feature Engineering:</strong> Extracted text
                        features using TF-IDF vectorization with bigrams and
                        capped at 50,000 maximum features.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <strong>Dimensionality Reduction:</strong> Applied
                        Truncated SVD (Latent Semantic Analysis) to reduce the
                        sparse feature space from 50,000 down to 200 dimensions.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-blue-500 shrink-0 mt-0.5"
                        size={18}
                      />
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <strong>Quality Validation:</strong> Normalized the
                        final matrix using StandardScaler and confirmed
                        readiness for ML training via stratified combined
                        dataset views.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="overflow-x-auto pt-4 border-t border-gray-100">
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
              </div>
            </div>
          </div>

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
                minority community language, including AAVE and in-group slang.
                We must monitor this in Milestone 3 by disaggregating metrics by
                identity-term presence.
              </p>
            </div>

            <div className="space-y-4">
              <ShieldAlert className="text-yellow-500/80 mb-4" size={32} />
              <h4 className="text-white text-xl font-bold border-b border-gray-800 pb-2">
                Annotation Subjectivity
              </h4>
              <p className="text-sm leading-relaxed text-gray-400">
                Jigsaw toxicity scores are crowd-sourced from human raters with
                varying cultural backgrounds. Binarizing at our 0.5 threshold
                unavoidably discards annotator uncertainty.
              </p>
            </div>

            <div className="space-y-4">
              <ShieldAlert className="text-yellow-500/80 mb-4" size={32} />
              <h4 className="text-white text-xl font-bold border-b border-gray-800 pb-2">
                Missing Context
              </h4>
              <p className="text-sm leading-relaxed text-gray-400">
                Tweets are often replies to images, videos, or prior threads
                unavailable in text-only datasets. Without this context,
                instances of sarcasm and irony may be miscategorized by the
                model.
              </p>
            </div>
          </div>
        </div>
      </div>

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

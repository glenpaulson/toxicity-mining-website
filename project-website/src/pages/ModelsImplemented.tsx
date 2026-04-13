import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Assumption { assumption: string; addressed: string }
interface Challenge  { challenge: string; solution: string }
interface Metric     { name: string; value: string }

interface Model {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  owner: string;
  badge: string;
  badgeColor: string;
  summary: string;
  why: string[];
  assumptions: Assumption[];
  tuning: string[];
  challenges: Challenge[];
  metrics: Metric[];
  metricsNote?: string;
  dataTransformation: { stage: string; format: string; shape: string }[];
}

// ── Data ─────────────────────────────────────────────────────────────────────
const models: Model[] = [
  // ── Logistic Regression ───────────────────────────────────────────────────
  {
    id: "lr",
    name: "Logistic Regression",
    category: "Regression",
    categoryColor: "bg-blue-100 text-blue-700",
    owner: "Glen",
    badge: "Regression",
    badgeColor: "bg-blue-50 border-blue-200 text-blue-700",
    summary:
      "A linear model for binary classification. Predicts the probability of a comment being toxic via the sigmoid function, trained on 50,000-dimensional TF-IDF features.",
    why: [
      "Binary problem fit — toxicity is a binary outcome (toxic = 1 / non-toxic = 0); Logistic Regression is the canonical regression model for this.",
      "Interpretability — learned coefficients directly reveal which TF-IDF features (words/n-grams) push a comment toward toxicity.",
      "Strong TF-IDF baseline — well-known to perform strongly on high-dimensional sparse text features.",
      "Regularisation — L1 (Lasso) and L2 (Ridge) penalties control overfitting and perform implicit feature selection across 50,000 TF-IDF dimensions.",
      "Calibrated probabilities — outputs well-calibrated probabilities, making ROC-AUC meaningful and enabling future threshold adjustment.",
    ],
    assumptions: [
      { assumption: "Linear decision boundary in feature space", addressed: "TF-IDF maps raw text into a 50,000-dimensional sparse space; Logistic Regression finds a linear hyperplane effective for text classification." },
      { assumption: "Features are numerical", addressed: "X_train/X_val/X_test are float64 TF-IDF matrices — no categorical conversion needed." },
      { assumption: "Features are not perfectly multicollinear", addressed: "TF-IDF weights are document-specific; L1/L2 regularisation mitigates collinearity among co-occurring word features." },
      { assumption: "Observations are independent", addressed: "Each tweet/comment is independently sampled from the dataset." },
      { assumption: "No extreme outliers", addressed: "TF-IDF caps term influence via inverse document frequency; regularisation parameter C limits weight magnitude." },
      { assumption: "Large enough sample", addressed: "Training set has ~47K samples — well above the minimum for stable logistic regression." },
    ],
    tuning: [
      "GridSearchCV over C ∈ {0.01, 0.1, 1.0, 10.0, 100.0} × penalty ∈ {L1, L2}.",
      "5-fold cross-validation scored on F1.",
      "solver='liblinear' — supports both L1 and L2, faster than saga on ~47K samples.",
      "Best parameters: C = 1.0, penalty = L1 (CV F1 = 0.8195).",
      "Results visualised as a heatmap of mean CV F1 across the full parameter grid.",
    ],
    challenges: [
      { challenge: "Choosing L1 vs L2 penalty", solution: "Used GridSearchCV over both; L1 won because the 50,000-dim TF-IDF space benefits from sparse weight selection (irrelevant tokens zeroed out)." },
      { challenge: "Solver selection & convergence speed", solution: "Used solver='liblinear' — supports both penalties and is faster than 'saga' on this dataset size. max_iter=500 ensures convergence." },
      { challenge: "Class imbalance in raw dataset", solution: "Preprocessed pkl files use stratified splits from Milestone 2; class_weight='balanced' available if needed." },
      { challenge: "High-dimensional feature space (50,000 TF-IDF dims)", solution: "Regularisation parameter C controls the bias-variance trade-off; L1 penalty actively zeroes uninformative features." },
      { challenge: "Grid search run time", solution: "n_jobs=-1 parallelises across all available CPU cores." },
    ],
    metrics: [
      { name: "Accuracy",  value: "0.839" },
      { name: "Precision", value: "0.875" },
      { name: "Recall",    value: "0.784" },
      { name: "F1 Score",  value: "0.827" },
      { name: "ROC-AUC",   value: "0.915" },
    ],
    metricsNote:
      "Classification metrics are used (not RMSE/R²) because Logistic Regression predicts binary class probabilities. R²/MSE on a binary {0,1} target is methodologically incorrect — every NLP toxicity benchmark uses Accuracy, F1, and ROC-AUC.",
    dataTransformation: [
      { stage: "Raw Text", format: "String (variable-length comment/tweet)", shape: "(N,)" },
      { stage: "After TF-IDF Vectorisation (50,000 vocab)", format: "Sparse float64 matrix", shape: "(N, 50,000)" },
      { stage: "Loaded as X_train / X_val / X_test", format: "Dense or sparse float64 matrix", shape: "(N, 50,000)" },
    ],
  },

  // ── Naïve Bayes ───────────────────────────────────────────────────────────
  {
    id: "nb",
    name: "Naïve Bayes",
    category: "Classification",
    categoryColor: "bg-purple-100 text-purple-700",
    owner: "Rahul",
    badge: "Classification",
    badgeColor: "bg-purple-50 border-purple-200 text-purple-700",
    summary:
      "A probabilistic baseline classifier. Uses Complement Naïve Bayes on TF-IDF features, well-suited to high-dimensional sparse text.",
    why: [
      "Strong baseline — Naïve Bayes is a proven baseline for text classification, especially with TF-IDF sparse features.",
      "Efficiency — training is extremely fast even on large vocabularies, making it ideal as a reference point.",
      "Suitable for sparse data — performs well with high-dimensional sparse inputs like TF-IDF.",
      "Probabilistic output — provides class-membership probabilities useful for the Stacking Classifier meta-learner.",
    ],
    assumptions: [
      { assumption: "Feature independence (Naïve assumption)", addressed: "Words are assumed to occur independently given the class. In practice this is violated, but the model still performs well on text data." },
      { assumption: "Multinomial distribution of features", addressed: "TF-IDF frequency-based inputs satisfy this for MultinomialNB; switched to ComplementNB to handle imbalanced class patterns." },
    ],
    tuning: [
      "GridSearchCV over alpha (Laplace smoothing) ∈ {0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1.0, 2.0, 5.0}.",
      "5-fold CV scored on F1. Best alpha = 5.0 (CV F1 = 0.777).",
      "Tested different TF-IDF configurations: n-grams (1,2), min_df and max_df.",
      "Switched from MultinomialNB → ComplementNB to improve performance on imbalanced patterns.",
    ],
    challenges: [
      { challenge: "Lower performance compared to other models (~78%)", solution: "Switched from MultinomialNB to ComplementNB and improved TF-IDF features with bigrams and rare-word filtering." },
      { challenge: "Naïve independence assumption violated in language", solution: "Accepted as a known limitation; the model still performs competitively as a baseline." },
    ],
    metrics: [
      { name: "Accuracy",  value: "0.779" },
      { name: "Precision", value: "0.773" },
      { name: "Recall",    value: "0.779" },
      { name: "F1 Score",  value: "0.776" },
      { name: "ROC-AUC",   value: "0.779" },
    ],
    dataTransformation: [
      { stage: "Raw Text", format: "String", shape: "(N,)" },
      { stage: "After TF-IDF Vectorisation", format: "Sparse float64 matrix", shape: "(N, 50,000)" },
    ],
  },

  // ── LightGBM ──────────────────────────────────────────────────────────────
  {
    id: "lgbm",
    name: "LightGBM",
    category: "Classification",
    categoryColor: "bg-purple-100 text-purple-700",
    owner: "Rahul",
    badge: "Classification",
    badgeColor: "bg-purple-50 border-purple-200 text-purple-700",
    summary:
      "A gradient-boosted decision tree model. Applied after TF-IDF + TruncatedSVD (300 components) for dimensionality reduction, tuned using Optuna.",
    why: [
      "Non-linear relationships — LightGBM captures complex, non-linear interactions between features that linear models miss.",
      "Efficiency on large datasets — the leaf-wise growth strategy makes it significantly faster than traditional GBMs.",
      "Dense feature compatibility — works better with dense features, motivating TF-IDF → SVD (300 components) reduction.",
      "Strong regularisation — built-in L1/L2 regularisation (reg_alpha, reg_lambda) reduces overfitting.",
    ],
    assumptions: [
      { assumption: "Does not assume linearity", addressed: "Uses gradient-boosting decision trees, capturing non-linear feature interactions." },
      { assumption: "Works better with dense features", addressed: "TF-IDF features were reduced to 300 dense components using TruncatedSVD before training." },
      { assumption: "Benefits from regularisation", addressed: "reg_alpha and reg_lambda tuned via Optuna to prevent overfitting." },
    ],
    tuning: [
      "Optuna (50 trials, TPE sampler) over: n_estimators, learning_rate, max_depth, num_leaves, min_child_samples, subsample, colsample_bytree, reg_alpha, reg_lambda.",
      "Early stopping applied on validation loss.",
      "Best: max_depth=8, num_leaves=77, n_estimators=1390, learning_rate=0.060 (CV F1 = 0.750).",
    ],
    challenges: [
      { challenge: "High-dimensional TF-IDF caused instability", solution: "Applied TruncatedSVD to reduce to 300 dense components before training." },
      { challenge: "F1 score instability across runs", solution: "Used probability threshold tuning and proper validation-based model selection." },
    ],
    metrics: [
      { name: "Accuracy",  value: "0.770" },
      { name: "Precision", value: "0.791" },
      { name: "Recall",    value: "0.722" },
      { name: "F1 Score",  value: "0.755" },
      { name: "ROC-AUC",   value: "0.769" },
    ],
    dataTransformation: [
      { stage: "Raw Text", format: "String", shape: "(N,)" },
      { stage: "After TF-IDF Vectorisation", format: "Sparse float64 matrix", shape: "(N, 50,000)" },
      { stage: "After TruncatedSVD (300 components)", format: "Dense float64 matrix", shape: "(N, 300)" },
    ],
  },

  // ── DistilBERT ────────────────────────────────────────────────────────────
  {
    id: "bert",
    name: "DistilBERT",
    category: "Classification",
    categoryColor: "bg-purple-100 text-purple-700",
    owner: "Rahul",
    badge: "Classification",
    badgeColor: "bg-purple-50 border-purple-200 text-purple-700",
    summary:
      "A transformer-based deep learning model. Captures contextual meaning, sarcasm, and word dependencies that bag-of-words models miss. Best-performing model overall.",
    why: [
      "Contextual embeddings — self-attention captures word meaning based on surrounding context, enabling detection of sarcasm and implied toxicity.",
      "Outperforms classical models — transformers consistently achieve state-of-the-art on NLP toxicity benchmarks (Jigsaw, HatEval, SemEval).",
      "No feature independence assumption — unlike Naïve Bayes, DistilBERT models relationships between all words in a sentence simultaneously.",
      "Pre-trained representations — transfer learning from large-scale pretraining gives a strong starting point with limited fine-tuning data.",
    ],
    assumptions: [
      { assumption: "Does not assume feature independence", addressed: "Self-attention mechanism models all pairwise word relationships within each comment." },
      { assumption: "Learns contextual embeddings via self-attention", addressed: "Fine-tuned on the combined toxic/non-toxic dataset directly." },
      { assumption: "Requires substantial data and compute", addressed: "~79K combined samples used; mixed precision (fp16) applied to reduce memory and training time." },
    ],
    tuning: [
      "Optuna over: learning_rate (1e-5 to 5e-5), batch_size ∈ {8, 16}, epochs ∈ {2, 3, 4}, weight_decay.",
      "Early stopping on validation loss.",
      "Mixed precision (fp16) training to reduce GPU memory.",
      "Switched from staged training to direct training on combined dataset — improved consistency.",
    ],
    challenges: [
      { challenge: "Lower performance initially (~67%)", solution: "Switched from staged dataset training to training directly on the combined dataset with improved preprocessing consistency." },
      { challenge: "Training instability and runtime", solution: "Reduced Optuna trials and used mixed precision (fp16) training to stabilise and accelerate runs." },
    ],
    metrics: [
      { name: "Accuracy",  value: "0.870" },
      { name: "Precision", value: "0.840" },
      { name: "Recall",    value: "0.910" },
      { name: "F1 Score",  value: "0.870" },
      { name: "ROC-AUC",   value: "0.870" },
    ],
    dataTransformation: [
      { stage: "Raw Text", format: "String", shape: "(N,)" },
      { stage: "After Preprocessing (lowercasing, URL removal, tokenization)", format: "Cleaned string", shape: "(N,)" },
      { stage: "After DistilBERT Tokenizer (HuggingFace)", format: "input_ids + attention_mask tensors", shape: "(N, 512)" },
    ],
  },

  // ── Stacking Classifier ───────────────────────────────────────────────────
  {
    id: "stack",
    name: "Stacking Classifier",
    category: "Classification",
    categoryColor: "bg-purple-100 text-purple-700",
    owner: "Rahul",
    badge: "Classification (Ensemble)",
    badgeColor: "bg-purple-50 border-purple-200 text-purple-700",
    summary:
      "An ensemble that stacks Naïve Bayes, Logistic Regression, and LightGBM as base models, with Logistic Regression as the meta-learner trained on out-of-fold predictions.",
    why: [
      "Combines complementary model strengths — Naïve Bayes captures probabilistic word patterns; Logistic Regression captures linear relationships; LightGBM captures non-linear interactions.",
      "Reduces individual model weaknesses — stacking can outperform any single base model by learning when each is most reliable.",
      "Out-of-fold training prevents leakage — base model predictions on unseen fold data are used to train the meta-learner, preventing information leakage.",
    ],
    assumptions: [
      { assumption: "Base models capture different patterns", addressed: "NB (probabilistic), LR (linear), LightGBM (non-linear) are architecturally diverse by design." },
      { assumption: "Meta-model (LR) assumes linear combination of base predictions", addressed: "The 3 base model probabilities form a low-dimensional, well-conditioned input for Logistic Regression." },
    ],
    tuning: [
      "Each base model tuned individually using Optuna (see respective model sections).",
      "Out-of-fold (OOF) predictions with StratifiedKFold used to train the meta-model.",
      "Meta-model: Logistic Regression with default/regularized parameters.",
      "Different preprocessing for each base model: TF-IDF for NB & LR; TF-IDF + SVD for LightGBM.",
    ],
    challenges: [
      { challenge: "Data leakage risk in meta-model training", solution: "Used OOF predictions with StratifiedKFold to ensure the meta-learner only trains on unseen predictions." },
      { challenge: "Different preprocessing requirements per base model", solution: "TF-IDF features for NB and LR; TF-IDF + TruncatedSVD (300 dims) for LightGBM." },
    ],
    metrics: [
      { name: "Accuracy",  value: "0.820" },
      { name: "Precision", value: "0.840" },
      { name: "Recall",    value: "0.800" },
      { name: "F1 Score",  value: "0.820" },
    ],
    dataTransformation: [
      { stage: "Raw Text", format: "String", shape: "(N,)" },
      { stage: "TF-IDF (for NB + LR base models)", format: "Sparse float64 matrix", shape: "(N, 50,000)" },
      { stage: "TF-IDF + SVD (for LightGBM base model)", format: "Dense float64 matrix", shape: "(N, 300)" },
      { stage: "OOF base model predictions (meta-model input)", format: "Dense float64 matrix", shape: "(N, 3)" },
    ],
  },

  // ── KMeans ────────────────────────────────────────────────────────────────
  {
    id: "kmeans",
    name: "KMeans Clustering",
    category: "Clustering",
    categoryColor: "bg-green-100 text-green-700",
    owner: "Himanshu",
    badge: "Clustering",
    badgeColor: "bg-green-50 border-green-200 text-green-700",
    summary:
      "Unsupervised clustering to validate the natural binary structure of the dataset (toxic vs non-toxic) without using labels, applied to TF-IDF → SVD → StandardScaler features.",
    why: [
      "Dataset validation — KMeans verifies whether the data naturally separates into toxic/non-toxic groups without using any labels, serving as a sanity check on dataset quality.",
      "Natural binary structure — t-SNE in Milestone 2 confirmed a clear binary clustering; KMeans formalises this unsupervised.",
      "Scalability — O(n·k·i·d) complexity is computationally efficient for ~59K samples with 200 SVD features, unlike hierarchical clustering (O(n²)).",
    ],
    assumptions: [
      { assumption: "Clusters are spherical (equal variance)", addressed: "StandardScaler ensures all 200 SVD dimensions are equally weighted." },
      { assumption: "k must be specified upfront", addressed: "Determined using the Elbow Method, Silhouette Score, and Davies-Bouldin Index — all agreed on k=2." },
      { assumption: "Uses Euclidean distance", addressed: "StandardScaler makes Euclidean distance meaningful across all features." },
      { assumption: "Sensitive to outliers", addressed: "TruncatedSVD smooths high-dimensional noise before clustering." },
      { assumption: "Assumes similar cluster sizes", addressed: "Stratified sampling from Milestone 2 gives a reasonably balanced dataset." },
    ],
    tuning: [
      "Evaluated k from 2 to 8 using three complementary metrics.",
      "Elbow Method (Inertia) — identifies the point of diminishing returns.",
      "Silhouette Score (higher = better, max = 1) — measures cluster cohesion vs. separation.",
      "Davies-Bouldin Index (lower = better, min = 0) — measures average cluster similarity.",
      "All three metrics agreed on k = 2. Used k-means++ initialisation, n_init=10, max_iter=300.",
    ],
    challenges: [
      { challenge: "Raw text cannot be fed to KMeans directly", solution: "Applied TF-IDF → TruncatedSVD → StandardScaler pipeline from Milestone 2." },
      { challenge: "Silhouette Score and Davies-Bouldin Index disagreed on optimal k with full dataset", solution: "Used Silhouette as primary metric; sampled 10,000 rows to match Milestone 2 analysis and confirm k=2." },
      { challenge: "KMeans sensitive to random initialisation", solution: "Used k-means++ with n_init=10 to ensure stable, reproducible results." },
      { challenge: "High-dimensional sparse TF-IDF matrix", solution: "Used TruncatedSVD instead of PCA — works directly on sparse matrices." },
    ],
    metrics: [
      { name: "Silhouette Score",    value: "0.0999" },
      { name: "Davies-Bouldin Index", value: "6.61" },
      { name: "Adjusted Rand Index",  value: "0.004" },
      { name: "Inertia",             value: "1,993,349" },
    ],
    metricsNote:
      "Low Silhouette Score and ARI reflect that toxic/non-toxic language does not form geometrically tight clusters in SVD space — this is expected for NLP tasks. The result confirms the binary structure while highlighting that linear feature spaces are insufficient for clean separation, motivating the use of transformer models.",
    dataTransformation: [
      { stage: "Raw Text", format: "String", shape: "(N,)" },
      { stage: "After TF-IDF Vectorisation", format: "Sparse float64 matrix", shape: "(N, ~100K vocab)" },
      { stage: "After TruncatedSVD (200 components)", format: "Dense float64 matrix", shape: "(N, 200)" },
      { stage: "After StandardScaler", format: "Dense float64 (zero mean, unit variance)", shape: "(N, 200)" },
    ],
  },

  // ── Frequent Pattern Mining ───────────────────────────────────────────────
  {
    id: "fpm",
    name: "Frequent Pattern Mining (Apriori)",
    category: "Frequent Pattern Mining",
    categoryColor: "bg-orange-100 text-orange-700",
    owner: "Augustine",
    badge: "Frequent Pattern Mining",
    badgeColor: "bg-orange-50 border-orange-200 text-orange-700",
    summary:
      "Apriori association rule mining on a 10,000-comment stratified sample. Discovers word co-occurrence patterns unique to toxic vs non-toxic language.",
    why: [
      "Discover hidden word associations — unlike classifiers that predict labels, Apriori reveals which words frequently co-occur in toxic comments.",
      "Toxic vs non-toxic contrast — running Apriori separately on each class directly contrasts word patterns unique to toxic content.",
      "Transactional data fit — each comment is a 'transaction' and each word is an 'item'; Apriori's downward closure prunes the search space efficiently.",
      "Actionable metrics — Support (how common), Confidence (how reliable), and Lift (how surprising) give a multi-dimensional view of word associations.",
    ],
    assumptions: [
      { assumption: "Items are categorical (present or absent)", addressed: "Text tokenized into words; each word is either present or absent — one-hot encoded via TransactionEncoder." },
      { assumption: "Transactions are independent", addressed: "Each comment is independently authored and sampled." },
      { assumption: "Minimum support threshold must be set", addressed: "Tested thresholds 0.01–0.10; selected 0.01 as a balance between quantity and quality of itemsets." },
      { assumption: "Downward closure property (frequent subsets of frequent itemsets are also frequent)", addressed: "Inherent to Apriori; requires no special handling." },
      { assumption: "Word order does not matter", addressed: "Apriori treats items as sets — acceptable since the focus is on co-occurrence, not sequence." },
    ],
    tuning: [
      "Swept min_support ∈ {0.01, 0.02, 0.03, 0.05, 0.07, 0.10} on both toxic and non-toxic subsets.",
      "Selected min_support = 0.01 — balances between too many trivial patterns and too few results.",
      "min_confidence = 0.2 for association rule generation.",
      "max_len = 4 to limit itemset size and computation.",
    ],
    challenges: [
      { challenge: "Raw text cannot be fed to Apriori directly", solution: "Preprocessed text into tokenized word lists, then used TransactionEncoder for one-hot encoding." },
      { challenge: "Large vocabulary makes Apriori slow", solution: "Removed stopwords and short words (≤2 chars) to reduce vocabulary significantly." },
      { challenge: "Full 78K dataset too large for Apriori", solution: "Sampled 5,000 toxic + 5,000 non-toxic (stratified, balanced) comments." },
      { challenge: "Common words dominating frequent itemsets", solution: "Stopword removal and minimum word length filter surfaced more meaningful word associations." },
      { challenge: "Comparing patterns across classes", solution: "Ran Apriori separately on toxic and non-toxic subsets to directly contrast word associations." },
    ],
    metrics: [
      { name: "Toxic Rules",       value: "68" },
      { name: "Non-Toxic Rules",   value: "46" },
      { name: "Toxic Avg Lift",    value: "2.04" },
      { name: "Toxic Max Lift",    value: "6.51" },
      { name: "Non-Toxic Max Lift", value: "5.86" },
    ],
    metricsNote:
      "Highest-lift toxic rule: {black} ⇒ {white} (Lift 6.51, Confidence 0.349). Highest-lift non-toxic rule: {president} ⇒ {trump} (Lift 5.86). Lift > 1 indicates co-occurrence is non-random; values above 3 indicate strong associations.",
    dataTransformation: [
      { stage: "Raw Text", format: "String", shape: "(N,)" },
      { stage: "After Preprocessing & Tokenization", format: "List of words per comment", shape: "(N, variable tokens)" },
      { stage: "After TransactionEncoder (One-Hot)", format: "Boolean matrix (True/False per word)", shape: "(N, vocab_size)" },
    ],
  },
];

// ── Comparison table data ─────────────────────────────────────────────────────
const comparisonRows = [
  { model: "Naïve Bayes",          acc: "0.779", prec: "0.773", rec: "0.779", f1: "0.776", auc: "0.779", highlight: false },
  { model: "LightGBM",             acc: "0.770", prec: "0.791", rec: "0.722", f1: "0.755", auc: "0.769", highlight: false },
  { model: "Logistic Regression",  acc: "0.839", prec: "0.875", rec: "0.784", f1: "0.827", auc: "0.915", highlight: false },
  { model: "Stacking Classifier",  acc: "0.820", prec: "0.840", rec: "0.800", f1: "0.820", auc: "—",     highlight: false },
  { model: "DistilBERT",           acc: "0.870", prec: "0.840", rec: "0.910", f1: "0.870", auc: "0.870", highlight: true  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const SectionToggle = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="font-semibold text-gray-800 text-sm">{title}</span>
        {open ? (
          <ChevronUp size={18} className="text-gray-400 shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-400 shrink-0" />
        )}
      </button>
      {open && <div className="px-5 py-4 bg-white">{children}</div>}
    </div>
  );
};

const MetricPill = ({ name, value }: { name: string; value: string }) => (
  <div className="flex flex-col items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 min-w-[90px]">
    <span className="text-lg font-bold text-gray-900">{value}</span>
    <span className="text-xs text-gray-500 mt-0.5 text-center">{name}</span>
  </div>
);

const ModelCard = ({ model }: { model: Model }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-8 py-6 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${model.badgeColor}`}
            >
              {model.badge}
            </span>
            <span className="text-xs text-gray-400">Owner: {model.owner}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            {model.summary}
          </p>
        </div>
        <div className="shrink-0 mt-1">
          {expanded ? (
            <ChevronUp size={22} className="text-gray-400" />
          ) : (
            <ChevronDown size={22} className="text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-8 pb-8 space-y-4 border-t border-gray-100">
          {/* Performance metrics — always visible when expanded */}
          <div className="pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Performance
            </p>
            <div className="flex flex-wrap gap-3">
              {model.metrics.map((m) => (
                <MetricPill key={m.name} name={m.name} value={m.value} />
              ))}
            </div>
            {model.metricsNote && (
              <p className="text-xs text-gray-400 italic mt-3 leading-relaxed">
                {model.metricsNote}
              </p>
            )}
          </div>

          {/* Why chosen */}
          <SectionToggle title="Why this model was chosen">
            <ul className="space-y-2">
              {model.why.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 shrink-0 mt-0.5">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </SectionToggle>

          {/* Model assumptions */}
          <SectionToggle title="Model assumptions">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-4 text-gray-500 font-semibold w-2/5">
                      Assumption
                    </th>
                    <th className="text-left py-2 text-gray-500 font-semibold">
                      How we address it
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {model.assumptions.map((a, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2.5 pr-4 text-gray-800 align-top font-medium">
                        {a.assumption}
                      </td>
                      <td className="py-2.5 text-gray-600 align-top">
                        {a.addressed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionToggle>

          {/* Hyperparameter tuning */}
          <SectionToggle title="Hyperparameter tuning">
            <ul className="space-y-2">
              {model.tuning.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 shrink-0 mt-0.5">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </SectionToggle>

          {/* Challenges */}
          <SectionToggle title="Challenges faced & solutions">
            <div className="space-y-3">
              {model.challenges.map((c, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    <p className="text-xs font-semibold text-red-600 mb-0.5">
                      Challenge
                    </p>
                    <p className="text-sm text-gray-700">{c.challenge}</p>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                    <p className="text-xs font-semibold text-green-600 mb-0.5">
                      Solution
                    </p>
                    <p className="text-sm text-gray-700">{c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionToggle>

          {/* Before / After */}
          <SectionToggle title="Data transformation (before → after)">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-4 text-gray-500 font-semibold">Stage</th>
                    <th className="text-left py-2 pr-4 text-gray-500 font-semibold">Format</th>
                    <th className="text-left py-2 text-gray-500 font-semibold">Shape</th>
                  </tr>
                </thead>
                <tbody>
                  {model.dataTransformation.map((d, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2.5 pr-4 text-gray-800 align-top font-medium">
                        {i === 0 && (
                          <span className="inline-block bg-red-50 text-red-600 text-xs font-semibold px-2 py-0.5 rounded mr-2">
                            BEFORE
                          </span>
                        )}
                        {i === model.dataTransformation.length - 1 && (
                          <span className="inline-block bg-green-50 text-green-600 text-xs font-semibold px-2 py-0.5 rounded mr-2">
                            AFTER
                          </span>
                        )}
                        {i > 0 && i < model.dataTransformation.length - 1 && (
                          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded mr-2">
                            STEP
                          </span>
                        )}
                        {d.stage}
                      </td>
                      <td className="py-2.5 pr-4 text-gray-600 align-top">{d.format}</td>
                      <td className="py-2.5 text-gray-600 align-top font-mono text-xs">{d.shape}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionToggle>
        </div>
      )}
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const ModelsImplemented = () => {
  const categories = [
    { label: "Frequent Pattern Mining", count: 1, color: "bg-orange-100 text-orange-700 border-orange-200" },
    { label: "Classification",          count: 4, color: "bg-purple-100 text-purple-700 border-purple-200" },
    { label: "Clustering",              count: 1, color: "bg-green-100 text-green-700 border-green-200"  },
    { label: "Regression",              count: 1, color: "bg-blue-100 text-blue-700 border-blue-200"    },
  ];

  const classificationModels = models.filter((m) => m.category === "Classification");
  const otherModels = models.filter((m) => m.category !== "Classification");

  return (
    <div className="bg-[#EBEBEB] min-h-screen pt-32 pb-20 px-6 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">

        {/* ── Hero ── */}
        <div className="mb-14">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            Models Implemented
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Seven machine-learning models across four required categories —
            Frequent Pattern Mining, Classification, Clustering, and Regression —
            trained and evaluated on our 79K-comment toxicity dataset.
          </p>
        </div>

        {/* ── Category summary pills ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {categories.map((c) => (
            <div
              key={c.label}
              className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-2`}
            >
              <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border self-start ${c.color}`}>
                {c.label}
              </span>
              <span className="text-3xl font-bold text-gray-900">{c.count}</span>
              <span className="text-sm text-gray-500">
                {c.count === 1 ? "model" : "models"}
              </span>
            </div>
          ))}
        </div>

        {/* ── Classification models ── */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Classification</h2>
          <p className="text-gray-500 text-sm mb-6">
            Four models for binary toxicity prediction — from probabilistic baselines to transformer architectures.
          </p>
          <div className="space-y-4">
            {classificationModels.map((m) => (
              <ModelCard key={m.id} model={m} />
            ))}
          </div>
        </div>

        {/* ── Other categories ── */}
        {["Regression", "Clustering", "Frequent Pattern Mining"].map((cat) => {
          const catModels = otherModels.filter((m) => m.category === cat);
          const desc: Record<string, string> = {
            Regression: "Logistic Regression applied as the regression model, predicting toxicity probability via the sigmoid function.",
            Clustering: "KMeans clustering for unsupervised validation of the dataset's natural binary structure.",
            "Frequent Pattern Mining": "Apriori association rule mining to discover word co-occurrence patterns unique to toxic language.",
          };
          return (
            <div key={cat} className="mb-10">
              <h2 className="text-2xl font-semibold tracking-tight mb-2">{cat}</h2>
              <p className="text-gray-500 text-sm mb-6">{desc[cat]}</p>
              <div className="space-y-4">
                {catModels.map((m) => (
                  <ModelCard key={m.id} model={m} />
                ))}
              </div>
            </div>
          );
        })}

        {/* ── Cross-model comparison ── */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Classification Model Comparison
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              All five classification models evaluated on the same held-out test set (15,791 comments).
              DistilBERT achieves the best overall performance; Logistic Regression offers the best
              ROC-AUC among non-deep-learning models.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-6 text-gray-500 font-semibold">Model</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-semibold">Accuracy</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-semibold">Precision</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-semibold">Recall</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-semibold">F1</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-semibold">ROC-AUC</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-gray-100 ${
                        row.highlight
                          ? "bg-blue-50 font-semibold"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-3 pr-6 text-gray-900">
                        {row.model}
                        {row.highlight && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                            Best
                          </span>
                        )}
                      </td>
                      <td className="text-center py-3 px-4 text-gray-700">{row.acc}</td>
                      <td className="text-center py-3 px-4 text-gray-700">{row.prec}</td>
                      <td className="text-center py-3 px-4 text-gray-700">{row.rec}</td>
                      <td className="text-center py-3 px-4 text-gray-700">{row.f1}</td>
                      <td className="text-center py-3 px-4 text-gray-700">{row.auc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-4 italic">
              DistilBERT performs best overall (F1 = 0.870) due to contextual embeddings capturing sarcasm
              and implied toxicity. Logistic Regression achieves the highest ROC-AUC (0.915) among
              non-transformer models, reflecting well-calibrated probability outputs. LightGBM has lower
              recall (0.722) as it misses subtle toxic patterns in dense SVD features.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModelsImplemented;

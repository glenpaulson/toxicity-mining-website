const insightCards = [
  {
    icon: "🏆",
    title: "DistilBERT Outperforms All Classical Models",
    body: "The transformer-based model achieved F1 = 0.870 and Accuracy = 0.870, the highest of all five classifiers. Its self-attention mechanism captures sarcasm, irony, and contextual meaning that bag-of-words models fundamentally cannot.",
  },
  {
    icon: "📐",
    title: "Logistic Regression Punches Above Its Weight",
    body: "Despite being a simple linear model, Logistic Regression reached ROC-AUC = 0.915, the best of any non-deep-learning model. On 50,000-dimensional TF-IDF features with L1 regularisation, it remains a strong, interpretable baseline.",
  },
  {
    icon: "🔗",
    title: "Stacking Improves Recall but Not Peak F1",
    body: "The ensemble of Naïve Bayes + Logistic Regression + LightGBM (meta-learner: LR) achieved F1 = 0.820 and Recall = 0.800, which is better recall than any individual classical model, confirming that combining complementary learners reduces false negatives.",
  },
  {
    icon: "🧩",
    title: "Toxic Language Has Discoverable Word Patterns",
    body: "Apriori association rule mining found 68 toxic rules (avg Lift 2.04) versus 46 non-toxic rules. The highest-lift toxic rule, {black} ⇒ {white} (Lift 6.51), reveals racially charged co-occurrence patterns invisible to label-only classifiers.",
  },
  {
    icon: "🗂️",
    title: "Data Naturally Clusters Into Two Groups",
    body: "KMeans with k = 2 confirmed the binary structure of the dataset without using any labels (Silhouette Score = 0.10). The low ARI (0.004) shows that linear feature spaces cannot cleanly separate toxic from non-toxic text, motivating the use of transformer models.",
  },
  {
    icon: "⚡",
    title: "Dimensionality Reduction Is Critical for Tree Models",
    body: "LightGBM required TF-IDF → TruncatedSVD (300 components) to train stably. Without it, the 50,000-dim sparse matrix caused instability. After reduction, Optuna tuning achieved F1 = 0.755, competitive with Naïve Bayes (0.776).",
  },
];

const impactPoints = [
  {
    heading: "Safer Online Platforms",
    detail:
      "Automated toxicity detection can be deployed as a pre-moderation layer, flagging high-risk comments for human review before they reach other users. DistilBERT's high recall (0.910) means fewer harmful comments slip through undetected.",
  },
  {
    heading: "Reduced Moderation Burden",
    detail:
      "Human content moderators face significant mental-health costs from reviewing toxic material at scale. An ML-assisted pipeline can triage content, routing only borderline cases to humans and handling clear-cut violations automatically.",
  },
  {
    heading: "Linguistic Insights for Policy",
    detail:
      "The Apriori-discovered association rules give platform policy teams concrete, data-driven evidence of which word co-occurrences are statistically linked to toxicity, supporting rule-based filters alongside ML systems.",
  },
  {
    heading: "Equitable Detection Across Communities",
    detail:
      "By training on datasets that combine Twitter and Wikipedia talk-page comments, the models are exposed to diverse linguistic contexts. Understanding where models fail (e.g., coded or slang-heavy language) guides future dataset curation toward more equitable detection.",
  },
];

const limitations = [
  {
    area: "Dataset Scope",
    limitation:
      "The combined dataset (~79K comments) draws from Twitter and Wikipedia talk pages. Toxic language on other platforms (Reddit, Discord, TikTok) may use different vocabulary, slang, and norms that are underrepresented.",
    improvement:
      "Expand to multi-platform datasets; incorporate non-English sources for multilingual toxicity detection.",
  },
  {
    area: "Static Labels",
    limitation:
      "Binary labels (toxic / non-toxic) collapse nuanced forms of harm (threats, identity attacks, insults, and obscenity) into a single class. The model cannot distinguish severity.",
    improvement:
      "Adopt multi-label or severity-ranked annotation schemes (e.g., Jigsaw's six sub-categories: threat, insult, obscene, identity_hate, toxic, severe_toxic).",
  },
  {
    area: "Evolving Language",
    limitation:
      "Toxic language evolves rapidly. Slang, dog-whistles, and new coded terms emerge faster than labelled datasets can be updated, causing model drift over time.",
    improvement:
      "Implement continual learning or periodic fine-tuning pipelines; monitor prediction confidence distributions for drift signals.",
  },
  {
    area: "Context Blindness",
    limitation:
      "Models classify individual comments in isolation. A comment that appears toxic in isolation may be benign in context (e.g., a quoted example or satire), and vice versa.",
    improvement:
      "Incorporate thread context and reply-chain embeddings; experiment with multi-turn conversational models.",
  },
  {
    area: "Compute & Accessibility",
    limitation:
      "DistilBERT requires GPU resources for training and inference at scale. Classical models are more accessible for resource-constrained deployments.",
    improvement:
      "Distil further (e.g., TinyBERT) or quantise the model for CPU inference; offer tiered deployment options based on latency/accuracy trade-offs.",
  },
];

const futureWork = [
  "Fine-tune larger transformer models (BERT-base, RoBERTa, DeBERTa) to close the accuracy gap further.",
  "Explore multi-label classification to distinguish threat, insult, identity-hate, and obscenity sub-categories.",
  "Build a real-time inference API and browser extension prototype to demonstrate deployment viability.",
  "Investigate fairness metrics (demographic parity, equal opportunity) to audit for bias against specific identity groups.",
  "Collect adversarial examples (intentional spelling mutations, emoji substitutions) to stress-test model robustness.",
  "Apply SHAP or LIME explanations to DistilBERT predictions to improve model interpretability for end-users.",
];

const Conclusion = () => {
  return (
    <div className="bg-[#EBEBEB] min-h-screen pt-32 pb-20 px-6 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            Conclusion
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            A summary of what we found, why it matters, and where toxicity
            detection research should go next.
          </p>
        </div>

        {/* Non-technical summary */}
        <div className="bg-[#111111] text-white rounded-2xl px-8 py-10 mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Plain-language summary
          </p>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-6 leading-snug">
            What did we actually find, and why does it matter?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-base leading-relaxed">
            <p>
              We trained seven machine-learning models on roughly 79,000 social
              media comments labelled as toxic or non-toxic. Our goal was to
              find out which approaches work best for automatically detecting
              harmful language online, and what those models can teach us about
              the structure of toxic content itself.
            </p>
            <p>
              The clearest finding: context is everything. A simple model that
              counts words can tell that a comment contains a harmful term, but
              it cannot tell whether that word is being used to attack someone
              or to criticise an attack. Our best model, DistilBERT, reads
              each comment the way a human does, weighing every word against
              every other word. That contextual understanding is what pushes
              its accuracy to 87%, correctly catching 91 out of every 100
              truly toxic comments.
            </p>
            <p>
              Beyond classification, we mined association rules across 10,000
              comments and found that toxic language follows statistically
              predictable patterns. Certain word pairings appear together far
              more often in toxic content than chance would predict, which is
              evidence that harmful language is not random noise but a
              structured, learnable phenomenon.
            </p>
            <p>
              Taken together, these results suggest that modern NLP tools are
              mature enough to assist, though not replace, human content
              moderators. Deployed thoughtfully, they can triage large volumes
              of content, surface the most harmful material quickly, and give
              platform policy teams concrete linguistic evidence to act on.
            </p>
          </div>
        </div>

        {/* Key insights */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            Key Insights &amp; Discoveries
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Six data-driven findings from across all models and analyses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {insightCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-3"
              >
                <span className="text-2xl">{card.icon}</span>
                <h3 className="text-base font-semibold text-gray-900 leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Model comparison recap */}
        <div className="mb-14">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Final Model Performance at a Glance
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              All five classifiers evaluated on the same held-out test set
              (15,791 comments).
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
                  {[
                    { model: "Naïve Bayes",         acc: "0.779", prec: "0.773", rec: "0.779", f1: "0.776", auc: "0.779", best: false },
                    { model: "LightGBM",            acc: "0.770", prec: "0.791", rec: "0.722", f1: "0.755", auc: "0.769", best: false },
                    { model: "Logistic Regression", acc: "0.839", prec: "0.875", rec: "0.784", f1: "0.827", auc: "0.915", best: false },
                    { model: "Stacking Classifier", acc: "0.820", prec: "0.840", rec: "0.800", f1: "0.820", auc: "0.820", best: false },
                    { model: "DistilBERT",          acc: "0.870", prec: "0.840", rec: "0.910", f1: "0.870", auc: "0.870", best: true  },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-gray-100 ${row.best ? "bg-blue-50 font-semibold" : "hover:bg-gray-50"}`}
                    >
                      <td className="py-3 pr-6 text-gray-900">
                        {row.model}
                        {row.best && (
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
          </div>
        </div>

        {/* Real-world impact */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            Real-World Impact
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            How these results translate into practical applications for
            platforms, policymakers, and researchers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {impactPoints.map((pt) => (
              <div
                key={pt.heading}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {pt.heading}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {pt.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            Limitations
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Where the current work falls short and what would be needed to
            address each gap.
          </p>
          <div className="space-y-4">
            {limitations.map((lim) => (
              <div
                key={lim.area}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                      Area
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {lim.area}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1">
                      Limitation
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {lim.limitation}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-1">
                      Potential Improvement
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {lim.improvement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future work */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            Future Work
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Concrete next steps for researchers building on this project.
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <ul className="space-y-4">
              {futureWork.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing statement */}
        <div className="bg-[#111111] text-white rounded-2xl px-8 py-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Final thought
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Toxic language is not just a technology problem; it is a social
            one. The models we built are tools, not solutions. Used responsibly,
            they can amplify the reach of human moderators and surface evidence
            that policies need updating. Used carelessly, they can silence
            legitimate speech and reproduce the biases present in their
            training data. The most important outcome of this project is not
            an F1 score; it is a clearer picture of what automated toxicity
            detection can and cannot do.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Conclusion;

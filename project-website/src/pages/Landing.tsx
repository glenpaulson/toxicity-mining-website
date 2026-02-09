import { ArrowDown } from "lucide-react";

const Landing = () => {
  const scrollToIntro = () => {
    const element = document.getElementById("introduction");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#EBEBEB] text-[#1a1a1a] font-sans">
      <div className="min-h-screen flex flex-col justify-center items-center px-6">
        {" "}
        <section className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight font-medium">
              Toxicity Mining using NLP
            </h1>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-light">
              The issue of online hate speech affects multiple groups across
              social media ecosystems. The most directly affected stakeholders
              are users who become targets of toxic or identity-based language.
            </p>

            <button
              onClick={scrollToIntro}
              className="mt-4 group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:border-gray-900 hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
            >
              <span className="text-sm font-medium tracking-wide uppercase">
                Learn More
              </span>
            </button>
          </div>
        </section>
      </div>

      <section
        id="introduction"
        className="bg-[#111111] text-white min-h-screen px-6 py-20 flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-end">
            <h2 className="text-6xl md:text-8xl font-medium tracking-tighter leading-none">
              Introduction
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-8 text-gray-400 text-lg leading-relaxed font-light">
            <p className="text-justify">
              <strong className="text-white font-normal block mb-2">
                Research Topic & Significance
              </strong>
              The research focuses on detecting and categorizing hate speech and
              toxic language on social media using Natural Language Processing
              (NLP). The main objective is to determine how effectively machine
              learning models can differentiate between general offensive
              language and hate speech that is targeted toward specific
              individuals, communities, or identities. This distinction is
              important because not all offensive content has the same social
              impact, and identity-based hate speech can cause more serious
              psychological and societal harm. With the rapid growth of social
              media platforms, large volumes of user-generated content are
              posted every day, making manual moderation impractical. Automated
              NLP-based systems can help identify harmful content at scale and
              support safer digital environments. Such systems can assist
              platforms in enforcing policies that protect the rights of users
              and prevent targeted harassment. contributes to safer, more
              inclusive, and respectful digital communities.
              <br />
              <br />
              The outcomes of this research will support the enforcement of more
              appropriate rules and policies on social media platforms. It will
              help ensure that the rights of individuals and communities are
              protected while maintaining open communication spaces. Users,
              moderators, social media companies, and policy makers all benefit
              from improved hate speech detection systems. Ultimately, this
              research contributes to safer, more inclusive, and respectful
              digital communities.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#EBEBEB] text-[#1a1a1a] min-h-screen px-6 py-24 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full mb-16 border-b border-gray-300 pb-8">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight">
            Stakeholders
          </h2>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 text-lg leading-relaxed">
          <div>
            <h3 className="text-2xl font-bold mb-4">Who is affected?</h3>
            <p className="mb-8 text-gray-600 text-justify">
              The issue of online hate speech affects multiple groups across
              social media ecosystems. The most directly affected stakeholders
              are users who become targets of toxic or identity-based language.
              Such exposure can lead to emotional distress, reduced
              participation, and a negative online experience. By identifying
              patterns of hate speech, the research helps highlight which
              communities or groups are most frequently victimized.
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-justify">
              Content moderators and trust-and-safety teams rely on automated
              systems to filter and prioritize harmful posts, making their work
              more efficient and scalable. Advertisers and business partners are
              also affected, as toxic environments can damage brand reputation
              and reduce platform value. In addition, governments and regulatory
              bodies are stakeholders because online hate speech can influence
              public discourse, elections, and real-world conflicts. Researchers
              and developers working in AI and NLP are also impacted, as they
              must design systems that are accurate, fair, and ethical. Overall,
              this issue has broad real-world implications across social,
              economic, and technological domains.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] text-gray-400 min-h-screen px-6 py-24 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full mb-20 border-b border-gray-800 pb-8">
          <h2 className="text-white text-5xl md:text-7xl font-medium tracking-tight">
            Current Landscape
          </h2>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h3 className="text-white text-3xl font-normal mb-8 block">
              Existing Solutions
            </h3>

            <div className="space-y-8 text-lg font-light leading-relaxed text-justify hyphens-auto">
              <p>
                <strong className="text-white font-medium block mb-2">
                  Lexicon-Based Approaches
                </strong>
                Several approaches have been proposed to detect hate speech and
                toxic language in online text. Early methods rely on keyword
                lists or sentiment lexicons, such as profanity dictionaries or
                tools like VADER. These approaches are simple and easy to
                interpret, but they often fail to capture context, sarcasm, or
                indirect forms of toxicity.
              </p>
              <p>
                <strong className="text-white font-medium block mb-2">
                  Traditional Machine Learning
                </strong>
                Traditional machine learning models, including Naive Bayes,
                Logistic Regression, and Support Vector Machines, are commonly
                used with TF-IDF features. These models are computationally
                efficient and interpretable, but their performance is limited
                when dealing with subtle or context-dependent toxic language.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-normal mb-8 block invisible">
              Spacer
            </h3>

            <div className="space-y-8 text-lg font-light leading-relaxed text-justify hyphens-auto">
              <p>
                <strong className="text-white font-medium block mb-2">
                  Transformer Models
                </strong>
                More recent work focuses on transformer-based models such as
                BERT, DistilBERT, and RoBERTa. These models achieve strong
                performance on benchmark datasets like Google Jigsaw Civil
                Comments by capturing semantic and contextual information.
                However, they require higher computational resources and provide
                limited interpretability.
                <br />
                Some studies also apply unsupervised techniques such as
                clustering or topic modeling to explore patterns in toxic
                language. These techniques are mainly used for exploratory
                analysis rather than direct prediction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EBEBEB] text-[#1a1a1a] min-h-screen px-6 py-24 flex flex-col justify-center items-center">
        <div className="max-w-5xl w-full bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-4">
                Our
                <br />
                Solution
              </h2>
              <div className="h-1 w-20 bg-[#1a1a1a] mt-4 rounded-full"></div>
            </div>

            <div className="md:col-span-8">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-justify hyphens-auto">
                This project addresses these gaps by using the{" "}
                <strong className="text-gray-900">
                  Google Jigsaw Civil Comments
                </strong>{" "}
                dataset as a clean benchmark for supervised learning and{" "}
                <strong className="text-gray-900">Reddit data</strong> as a
                real-world validation source.
              </p>

              <div className="my-8 p-6 bg-[#1a1a1a] rounded-2xl border border-blue-100 text-[#EBEBEB] text-lg font-medium italic">
                "DistilBERT is used as the primary predictive model due to its
                strong ability to capture contextual meaning."
              </div>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-justify hyphens-auto">
                Traditional machine learning models are used for comparison and
                interpretability. In addition,{" "}
                <strong className="text-gray-900">
                  clustering and association rule mining
                </strong>{" "}
                are applied to discover and explain linguistic patterns
                underlying toxic language. The limitations of weak labels in
                Reddit data are explicitly discussed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

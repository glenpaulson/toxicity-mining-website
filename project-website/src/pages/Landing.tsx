const Landing = () => {
  return (
    <div className="h-[calc(100vh-64px)] bg-[#EBEBEB] text-[#1a1a1a] font-sans flex flex-col justify-center items-center">
      <section className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight font-medium">
            Toxicity Mining using NLP
          </h1>

          <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-light">
            The issue of online hate speech affects multiple groups across
            social media ecosystems. The most directly affected stakeholders are
            users who become targets of toxic or identity-based language.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;

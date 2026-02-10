## Live Website

Live website hosted using GitHub Pages - [URL](https://glenpaulson.github.io/toxicity-mining-website/)

# Social Media Hate Speech and Toxicity Mining

This project focuses on categorizing toxic language and hate speech usage within social media platforms. Our primary objective is to determine the extent to which machine learning models can differentiate between generic offensive language and hate speech targeted at specific entities, users, or groups.

## 👥 Team Members
* **Rahul Hipparkar** 
* **Himanshu Jain** 
* **Augustine Joy** 
* **Glen Vadakkoott** 

## 🎯 Project Overview
Identifying these patterns provides insights into victimized groups and assists in building a safer digital environment. By differentiating between types of toxicity, platforms can enforce the correct rules and policies to ensure that the rights of communities and individuals are not violated.

## 🛠️ Methodology & Plan
Our high-level technical approach includes the following phases:
1.  **Text Preprocessing:** Tokenization and stop-word removal.
2.  **Feature Engineering:** Contextual analysis to prepare data for modeling.
3.  **Model Training:** Comparing traditional classifiers (Naive Bayes, Logistic Regression, SVM, LightGBM) against transformer-based models (BERT, DistilBERT).
4.  **Evaluation:** Visualizing results and evaluating model performance.

## 📊 Data Sources
We are utilizing both curated datasets and live social media data:

| Dataset | Link | Estimated Size | Key Features |
| :--- | :--- | :--- | :--- |
| **Google Jigsaw** | [HuggingFace](https://huggingface.co/datasets/google/civil_comments) | 660 MB (1.8M Rows) | text, toxicity, severe toxicity, insult, threat, identity threat  |
| **Reddit API (PRAW)** | [PRAW Docs](https://praw.readthedocs.io/en/stable/) | 150 MB (~50K posts) | Text, target label, subreddit, upvotes, created utc  |

> **Note on Collection:** Reddit data collection is performed via rate-limited requests (~100 requests/min) to ensure feasibility and avoid API blocks.

## ⚠️ Potential Bias & Limitations
We have identified several challenges and implemented specific mitigations:

* **Dialect & Language Bias:** Models may misinterpret non-native English or specific dialects.
    * *Mitigation:* Refine transformer models using diverse texts from the Jigsaw dataset and examine false positives on informal language.
* **Subjectivity of Hate Speech:** Experience of "hatefulness" differs from person to person.
    * *Mitigation:* Use multi-label annotations (toxicity, insult, threat, identity attack) rather than binary labels to capture nuance.
* **Sarcasm & Irony:** Models often struggle with non-literal language.
    * *Mitigation:* Utilize DistilBERT for better contextual understanding and manually review a sample of sarcastic comments.

## 📅 Project Milestones
- [x] Milestone 0: Project Proposal & Team Formation
- [ ] Milestone 1: Project Framing & Website Launch
- [ ] Milestone 2: Data Preparation/Collection & Cleaning
- [ ] Milestone 3: Model Implementation
- [ ] Milestone 4: Conclusion, Results & Project Report

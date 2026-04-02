# Thesis Review Summary

**Title:** Application of Machine Learning Algorithms in Predicting Divorce and Recommending an Appropriate Spouse in Hargeisa, Somaliland
**Author:** Abdiwasac Arab Abdillahi
**Date:** February 2026

## Executive Summary
This thesis presents a pioneering approach to marital stability research in the context of Hargeisa, Somaliland. By leveraging machine learning and localized primary data, the author successfully identifies that cultural and structural factors (Clan and Family influence) are more predictive of marital outcomes than individual psychological factors typically emphasized in Western literature.

## Key Findings
- **Top Predictors:** Spouse Choice Autonomy (19.0%), Clan Approval Requirement (17.8%), and Parental Influence (16.4%) account for over 53% of the model's predictive power.
- **Model Performance:** Gradient Boosting achieved the highest accuracy (90.0%) and AUC (0.947), demonstrating the effectiveness of ensemble learning for complex social data.
- **Recommendation Logic:** The system successfully inverts divorce probability into a compatibility score, distinguishing between successful and unsuccessful marriages with 81.3% accuracy.

## Technical Evaluation
- **Data Preprocessing:** Appropriate use of SMOTE to handle class imbalance and Z-score normalization for continuous variables.
- **Interpretability:** Strong implementation of SHAP (Shapley Additive Explanations) to provide transparent reasoning for predictions.
- **Integration Rules:** The mathematical logic for creating synthetic couple profiles (Table 6) is robust and culturally grounded (e.g., using 'Minimum' for autonomy and 'Maximum' for vulnerability).

## Conclusion
The work is a significant contribution to both Computer Science and Sociology, providing a practical, ethically-bounded tool for marriage counselors and families in Somaliland.

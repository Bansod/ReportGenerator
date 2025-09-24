const assessmentConfig = {
  as_hr_02: [
    {
      title: "Key Body Vitals",
      fields: {
        "Overall Health Score": "accuracy",
        "Heart Rate": "vitalsMap.vitals.heart_rate",
        "Blood Pressure Systolic": "vitalsMap.vitals.bp_sys",
        "Blood Pressure Diastolic": "vitalsMap.vitals.bp_dia",
        "Wellness Score": "vitalsMap.wellness_score"
      }
    },
    {
      title: "Fitness Levels",
      fields: {
        "Jog Test Time": "exercises[2].setList[0].time",
        "Squat Time": "exercises[3].setList[0].time",
        "Stand and Reach Time": "exercises[4].setList[0].time"
      }
    },
    {
      title: "Posture & Analysis",
      fields: {
        "Frontal Body View Analysis Score": "exercises[0].analysisScore",
        "Side Body View Analysis Score": "exercises[1].analysisScore"
      }
    },
    {
      title: "Body Composition",
      fields: {
        "BMI": "bodyCompositionData.BMI",
        "BFC": "bodyCompositionData.BFC",
        "BMR": "bodyCompositionData.BMR",
        "FM": "bodyCompositionData.FM",
        "FMI": "bodyCompositionData.FMI",
        "LM": "bodyCompositionData.LM",
        "LMI": "bodyCompositionData.LMI",
        "AGR": "bodyCompositionData.AGR",
        "WHR": "bodyCompositionData.WHR",
        "WHGR": "bodyCompositionData.WHGR",
        "Age": "bodyCompositionData.Age",
        "M_Age": "bodyCompositionData.M_Age",
        "HeightM": "bodyCompositionData.HeightM"
      }
    }
  ],

  as_card_01: [
    {
      title: "Key Body Vitals",
      fields: {
        "Overall Health Score": "accuracy",
        "Heart Rate": "vitalsMap.vitals.heart_rate",
        "Blood Pressure Systolic": "vitalsMap.vitals.bp_sys",
        "Blood Pressure Diastolic": "vitalsMap.vitals.bp_dia",
        "Wellness Score": "vitalsMap.wellness_score"
      }
    },
    {
      title: "Cardiovascular Endurance",
      fields: {
        "Jog Test Time": "exercises[2].setList[0].time",
        "Jog Test Accuracy": "exercises[2].setList[0].additionalFields[0].fieldValue"
      }
    },
    {
      title: "Body Composition",
      fields: {
        "BMI": "bodyCompositionData.BMI",
        "BFC": "bodyCompositionData.BFC",
        "BMR": "bodyCompositionData.BMR",
        "FM": "bodyCompositionData.FM",
        "FMI": "bodyCompositionData.FMI",
        "LM": "bodyCompositionData.LM",
        "LMI": "bodyCompositionData.LMI",
        "AGR": "bodyCompositionData.AGR",
        "WHR": "bodyCompositionData.WHR",
        "WHGR": "bodyCompositionData.WHGR",
        "Age": "bodyCompositionData.Age",
        "M_Age": "bodyCompositionData.M_Age"
      }
    }
  ]
};

module.exports = { assessmentConfig };

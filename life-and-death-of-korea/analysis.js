// Analysis to find when the circle reaches its maximum diameter
function findMaxDiameter() {
  let netChange = 0;
  let maxNetChange = 0;
  let maxChangeInfo = {
    year: deathBirthData[0].year,
    month: deathBirthData[0].month,
    netChange: 0,
  };

  for (let i = 0; i < deathBirthData.length; i++) {
    const data = deathBirthData[i];
    netChange += data.births - data.deaths;

    if (netChange > maxNetChange) {
      maxNetChange = netChange;
      maxChangeInfo = {
        year: data.year,
        month: data.month,
        netChange: netChange,
      };
    }
  }

  console.log("Maximum population growth occurred in:", maxChangeInfo);
  return maxChangeInfo;
}

// Add this to the setup function to run the analysis
function runAnalysis() {
  return findMaxDiameter();
}
